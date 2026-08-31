import {
    computed,
    inject,
    Injectable,
    OnDestroy,
    signal
} from "@angular/core";

import {
    HttpClient,
    HttpErrorResponse,
    HttpHeaders,
    HttpParams
} from "@angular/common/http";

import { Router } from "@angular/router";

import {
    finalize,
    Subscription,
    timer
} from "rxjs";

import { environment } from "./enviromnent";


interface SpotifyTokenResponse {

    access_token: string;

    token_type: "Bearer";

    expires_in: number;

    refresh_token?: string;

    scope: string;
}


@Injectable({
    providedIn: "root"
})
export class SpotifyAuthService implements OnDestroy {

    private readonly http = inject(HttpClient);
    private readonly router = inject(Router);

    // =========================================================
    // Spotify Konfiguration
    // =========================================================

    private readonly clientId =
        environment.spotify.clientId;

    private readonly redirectUri =
        environment.spotify.redirectUri;

    private readonly authorizeUrl =
        "https://accounts.spotify.com/authorize";

    private readonly tokenUrl =
        "https://accounts.spotify.com/api/token";


    // =========================================================
    // Scopes
    // =========================================================

    private readonly scopes: string[] = [

        // Playback State lesen
        "user-read-playback-state",

        // Play / Pause / Skip / etc.
        "user-modify-playback-state",

        // Aktuell abgespielten Track lesen
        "user-read-currently-playing",

        // Web Playback SDK
        "streaming"
    ];


    // =========================================================
    // Storage Keys
    // =========================================================

    private readonly ACCESS_TOKEN_KEY =
        "spotify_access_token";

    private readonly REFRESH_TOKEN_KEY =
        "spotify_refresh_token";

    private readonly EXPIRES_AT_KEY =
        "spotify_expires_at";

    private readonly CODE_VERIFIER_KEY =
        "spotify_code_verifier";

    private readonly STATE_KEY =
        "spotify_oauth_state";


    // =========================================================
    // Signals
    // =========================================================

    private readonly _accessToken =
        signal<string | null>(null);

    private readonly _refreshToken =
        signal<string | null>(null);

    private readonly _expiresAt =
        signal<number | null>(null);

    private readonly _loading =
        signal<boolean>(false);

    private readonly _refreshing =
        signal<boolean>(false);

    private readonly _error =
        signal<string | null>(null);


    // =========================================================
    // Public Readonly Signals
    // =========================================================

    public readonly accessToken =
        this._accessToken.asReadonly();

    public readonly expiresAt =
        this._expiresAt.asReadonly();

    public readonly loading =
        this._loading.asReadonly();

    public readonly refreshing =
        this._refreshing.asReadonly();

    public readonly error =
        this._error.asReadonly();


    // =========================================================
    // Computed Signals
    // =========================================================

    public readonly isAuthenticated = computed(() => {

        return (
            this._accessToken() !== null ||
            this._refreshToken() !== null
        );
    });


    // =========================================================
    // Subscriptions
    // =========================================================

    private refreshTimerSubscription?: Subscription;

    private refreshRequestSubscription?: Subscription;

    private tokenRequestSubscription?: Subscription;


    // =========================================================
    // Constructor
    // =========================================================

    constructor() {

        this.restoreTokens();
    }


    // =========================================================
    // Login
    // =========================================================

    public async login(): Promise<void> {

        this._error.set(null);

        /*
         * PKCE Code Verifier
         */
        const codeVerifier =
            this.generateRandomString(64);

        /*
         * Daraus SHA-256 Challenge erzeugen
         */
        const codeChallenge =
            await this.generateCodeChallenge(
                codeVerifier
            );

        /*
         * CSRF-Schutz
         */
        const state =
            this.generateRandomString(32);


        /*
         * Verifier + State müssen den Redirect
         * zu Spotify überleben.
         */
        sessionStorage.setItem(
            this.CODE_VERIFIER_KEY,
            codeVerifier
        );

        sessionStorage.setItem(
            this.STATE_KEY,
            state
        );


        const params = new URLSearchParams({

            client_id: this.clientId,

            response_type: "code",

            redirect_uri: this.redirectUri,

            scope: this.scopes.join(" "),

            state,

            code_challenge_method: "S256",

            code_challenge: codeChallenge
        });


        const url =
            `${this.authorizeUrl}?${params.toString()}`;


        /*
         * Benutzer zu Spotify schicken
         */
        window.location.assign(url);
    }


    // =========================================================
    // Spotify Callback
    // =========================================================

    public handleCallback(
        redirectAfterLogin: string = "/"
    ): void {

        const params =
            new URLSearchParams(
                window.location.search
            );


        const code =
            params.get("code");

        const receivedState =
            params.get("state");

        const error =
            params.get("error");


        // =====================================================
        // Spotify Login wurde abgelehnt
        // =====================================================

        if (error) {

            this._error.set(
                `Spotify Authorization fehlgeschlagen: ${error}`
            );

            this.cleanupPkce();

            return;
        }


        /*
         * Wenn die Seite kein Spotify Callback ist,
         * nichts machen.
         */
        if (!code) {
            return;
        }


        // =====================================================
        // State prüfen
        // =====================================================

        const expectedState =
            sessionStorage.getItem(
                this.STATE_KEY
            );

        // Callback wurde möglicherweise bereits erfolgreich verarbeitet.
        // Einen alten Authorization Code niemals erneut einlösen.
        if (!expectedState && this._accessToken()) {

            this.removeOAuthParametersFromUrl();

            this.router.navigateByUrl("/");

            return;
        }

        if (
            !receivedState ||
            !expectedState ||
            receivedState !== expectedState
        ) {
            this._error.set(
                "Ungültiger OAuth State."
            );

            this.cleanupPkce();

            return;
        }
        


        // =====================================================
        // Code Verifier holen
        // =====================================================

        const codeVerifier =
            sessionStorage.getItem(
                this.CODE_VERIFIER_KEY
            );


        if (!codeVerifier) {

            this._error.set(
                "PKCE Code Verifier fehlt."
            );

            this.cleanupPkce();

            return;
        }


        this.exchangeAuthorizationCode(
            code,
            codeVerifier,
            redirectAfterLogin
        );
    }


    // =========================================================
    // Authorization Code -> Access Token
    // =========================================================

    private exchangeAuthorizationCode(
        code: string,
        codeVerifier: string,
        redirectAfterLogin: string
    ): void {

        this._loading.set(true);
        this._error.set(null);


        const body = new HttpParams()

            .set(
                "client_id",
                this.clientId
            )

            .set(
                "grant_type",
                "authorization_code"
            )

            .set(
                "code",
                code
            )

            .set(
                "redirect_uri",
                this.redirectUri
            )

            .set(
                "code_verifier",
                codeVerifier
            );


        const headers =
            new HttpHeaders({

                "Content-Type":
                    "application/x-www-form-urlencoded"
            });


        /*
         * Falls der Benutzer mehrfach auf die
         * Callback-Seite kommt.
         */
        this.tokenRequestSubscription
            ?.unsubscribe();


        this.tokenRequestSubscription =
            this.http.post<SpotifyTokenResponse>(
                this.tokenUrl,
                body,
                {
                    headers
                }
            )
            .pipe(

                finalize(() => {

                    this._loading.set(false);
                })

            )
            .subscribe({

                next: response => {

                    this.storeTokenResponse(
                        response
                    );

                    this.cleanupPkce();

                    this.removeOAuthParametersFromUrl();

                    this.router.navigateByUrl(
                        redirectAfterLogin
                    );
                },


                error: (
                    error: HttpErrorResponse
                ) => {

                    console.error(
                        "Spotify Token Error:",
                        error
                    );

                    this._error.set(
                        "Spotify Access Token konnte nicht angefordert werden."
                    );

                    this.cleanupPkce();
                }
            });
    }


    // =========================================================
    // Refresh Token
    // =========================================================

    public refreshAccessToken(): void {

        /*
         * Verhindert doppelte parallele Refreshes.
         */
        if (this._refreshing()) {
            return;
        }


        const refreshToken =
            this._refreshToken();


        if (!refreshToken) {

            this.clearTokens();

            return;
        }


        this._refreshing.set(true);
        this._error.set(null);


        const body = new HttpParams()

            .set(
                "grant_type",
                "refresh_token"
            )

            .set(
                "refresh_token",
                refreshToken
            )

            /*
             * Bei PKCE erforderlich.
             */
            .set(
                "client_id",
                this.clientId
            );


        const headers =
            new HttpHeaders({

                "Content-Type":
                    "application/x-www-form-urlencoded"
            });


        this.refreshRequestSubscription
            ?.unsubscribe();


        this.refreshRequestSubscription =
            this.http.post<SpotifyTokenResponse>(
                this.tokenUrl,
                body,
                {
                    headers
                }
            )
            .pipe(

                finalize(() => {

                    this._refreshing.set(false);
                })

            )
            .subscribe({

                next: response => {

                    /*
                     * Spotify liefert nicht zwingend
                     * bei jedem Refresh einen neuen
                     * Refresh Token.
                     */
                    this.storeTokenResponse(
                        response,
                        refreshToken
                    );
                },


                error: (
                    error: HttpErrorResponse
                ) => {

                    console.error(
                        "Spotify Refresh Error:",
                        error
                    );


                    /*
                     * Refresh Token ungültig,
                     * abgelaufen oder widerrufen.
                     */
                    if (
                        error.status === 400 &&
                        error.error?.error ===
                            "invalid_grant"
                    ) {

                        this.clearTokens();

                        this._error.set(
                            "Spotify-Session ist abgelaufen. Bitte erneut anmelden."
                        );

                        return;
                    }


                    this._error.set(
                        "Spotify Access Token konnte nicht erneuert werden."
                    );


                    /*
                     * Bei Netzwerkproblemen später
                     * noch einmal versuchen.
                     */
                    this.scheduleRefreshRetry();
                }
            });
    }


    // =========================================================
    // Token Response speichern
    // =========================================================

    private storeTokenResponse(
        response: SpotifyTokenResponse,
        fallbackRefreshToken?: string
    ): void {

        const accessToken =
            response.access_token;


        const refreshToken =
            response.refresh_token ??
            fallbackRefreshToken ??
            this._refreshToken();


        /*
         * Spotify gibt expires_in in Sekunden zurück.
         */
        const expiresAt =
            Date.now() +
            response.expires_in * 1000;


        // =====================================================
        // Signals
        // =====================================================

        this._accessToken.set(
            accessToken
        );

        this._refreshToken.set(
            refreshToken ?? null
        );

        this._expiresAt.set(
            expiresAt
        );


        // =====================================================
        // Storage
        // =====================================================

        localStorage.setItem(
            this.ACCESS_TOKEN_KEY,
            accessToken
        );


        localStorage.setItem(
            this.EXPIRES_AT_KEY,
            expiresAt.toString()
        );


        if (refreshToken) {

            localStorage.setItem(
                this.REFRESH_TOKEN_KEY,
                refreshToken
            );
        }


        // =====================================================
        // Automatischen Refresh planen
        // =====================================================

        this.scheduleTokenRefresh();
    }


    // =========================================================
    // Automatischer Token Refresh
    // =========================================================

    private scheduleTokenRefresh(): void {

        this.refreshTimerSubscription
            ?.unsubscribe();


        const expiresAt =
            this._expiresAt();


        if (!expiresAt) {
            return;
        }


        /*
         * Token 60 Sekunden vor Ablauf erneuern.
         */
        const refreshAt =
            expiresAt - 60_000;


        const delay =
            Math.max(
                0,
                refreshAt - Date.now()
            );


        this.refreshTimerSubscription =
            timer(delay)
                .subscribe(() => {

                    this.refreshAccessToken();
                });
    }


    // =========================================================
    // Retry nach Fehler
    // =========================================================

    private scheduleRefreshRetry(): void {

        this.refreshTimerSubscription
            ?.unsubscribe();


        /*
         * Nach 30 Sekunden erneut versuchen.
         */
        this.refreshTimerSubscription =
            timer(30_000)
                .subscribe(() => {

                    this.refreshAccessToken();
                });
    }


    // =========================================================
    // Tokens beim App-Start wiederherstellen
    // =========================================================

    private restoreTokens(): void {

        const accessToken =
            localStorage.getItem(
                this.ACCESS_TOKEN_KEY
            );


        const refreshToken =
            localStorage.getItem(
                this.REFRESH_TOKEN_KEY
            );


        const expiresAtString =
            localStorage.getItem(
                this.EXPIRES_AT_KEY
            );


        const expiresAt =
            expiresAtString
                ? Number(expiresAtString)
                : null;


        this._accessToken.set(
            accessToken
        );

        this._refreshToken.set(
            refreshToken
        );

        this._expiresAt.set(
            expiresAt
        );


        if (!accessToken) {

            /*
             * Vielleicht existiert noch
             * ein Refresh Token.
             */
            if (refreshToken) {

                this.refreshAccessToken();
            }

            return;
        }


        if (!expiresAt) {

            if (refreshToken) {

                this.refreshAccessToken();
            }

            return;
        }


        /*
         * Access Token läuft bald ab oder
         * ist bereits abgelaufen.
         */
        if (
            expiresAt <=
            Date.now() + 60_000
        ) {

            if (refreshToken) {

                this.refreshAccessToken();

            } else {

                this.clearTokens();
            }

            return;
        }


        /*
         * Token ist noch gültig.
         */
        this.scheduleTokenRefresh();
    }


    // =========================================================
    // Logout
    // =========================================================

    public logout(): void {

        this.clearTokens();

        this.cleanupPkce();
    }


    private clearTokens(): void {

        this.refreshTimerSubscription
            ?.unsubscribe();

        this.refreshRequestSubscription
            ?.unsubscribe();


        this._accessToken.set(null);

        this._refreshToken.set(null);

        this._expiresAt.set(null);


        localStorage.removeItem(
            this.ACCESS_TOKEN_KEY
        );

        localStorage.removeItem(
            this.REFRESH_TOKEN_KEY
        );

        localStorage.removeItem(
            this.EXPIRES_AT_KEY
        );
    }


    // =========================================================
    // PKCE Cleanup
    // =========================================================

    private cleanupPkce(): void {

        sessionStorage.removeItem(
            this.CODE_VERIFIER_KEY
        );

        sessionStorage.removeItem(
            this.STATE_KEY
        );
    }


    // =========================================================
    // Callback URL aufräumen
    // =========================================================

    private removeOAuthParametersFromUrl(): void {

        const url =
            new URL(
                window.location.href
            );


        url.searchParams.delete(
            "code"
        );

        url.searchParams.delete(
            "state"
        );

        url.searchParams.delete(
            "error"
        );


        window.history.replaceState(
            {},
            document.title,
            url.pathname +
            url.search +
            url.hash
        );
    }


    // =========================================================
    // PKCE Helfer
    // =========================================================

    private generateRandomString(
        byteLength: number
    ): string {

        const bytes =
            new Uint8Array(
                byteLength
            );


        crypto.getRandomValues(
            bytes
        );


        return this.base64UrlEncode(
            bytes
        );
    }


    private async generateCodeChallenge(
        codeVerifier: string
    ): Promise<string> {

        const encoded =
            new TextEncoder().encode(
                codeVerifier
            );


        const digest =
            await crypto.subtle.digest(
                "SHA-256",
                encoded
            );


        return this.base64UrlEncode(
            new Uint8Array(
                digest
            )
        );
    }


    private base64UrlEncode(
        bytes: Uint8Array
    ): string {

        let binary = "";


        bytes.forEach(byte => {

            binary +=
                String.fromCharCode(
                    byte
                );
        });


        return btoa(binary)

            .replace(
                /\+/g,
                "-"
            )

            .replace(
                /\//g,
                "_"
            )

            .replace(
                /=+$/,
                ""
            );
    }


    // =========================================================
    // Destroy
    // =========================================================

    public ngOnDestroy(): void {

        this.refreshTimerSubscription
            ?.unsubscribe();

        this.refreshRequestSubscription
            ?.unsubscribe();

        this.tokenRequestSubscription
            ?.unsubscribe();
    }
}