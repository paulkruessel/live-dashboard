import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from "@angular/common/http";
import { computed, effect, Injectable, signal } from "@angular/core";
import { EMPTY, interval, Observable, catchError, map, startWith, Subscription, switchMap, finalize } from "rxjs";
import { SpotifyAuthService } from "./auth/auth-service";
import { SpotifyPlaybackState } from "./spotify-playback-state/spotify-playback-state";
import { Actions } from "./spotify-playback-state/actions";
import { Album } from "./spotify-playback-state/album";
import { Context } from "./spotify-playback-state/context";
import { Copyright } from "./spotify-playback-state/copyrights";
import { Device } from "./spotify-playback-state/device";
import { EpisodeObject } from "./spotify-playback-state/episode-object";
import { ExternalIds } from "./spotify-playback-state/external-ids";
import { ExternalUrls } from "./spotify-playback-state/external-urls";
import { Image } from "./spotify-playback-state/image";
import { LinkedFrom } from "./spotify-playback-state/linked-from";
import { Restrictions } from "./spotify-playback-state/restrictions";
import { ResumePoint } from "./spotify-playback-state/resume-point";
import { Show } from "./spotify-playback-state/show";
import { SimplifiedArtist } from "./spotify-playback-state/simplified-artist";
import { TrackObject } from "./spotify-playback-state/track-object";
import { SpotifyActionsDto, SpotifyAlbumDto, SpotifyContextDto, SpotifyCopyrightDto, SpotifyDeviceDto, SpotifyEpisodeDto, SpotifyExternalIdsDto, SpotifyExternalUrlsDto, SpotifyImageDto, SpotifyLinkedFromDto, SpotifyPlaybackStateDto, SpotifyResumePointDto, SpotifyRestrictionsDto, SpotifyShowDto, SpotifySimplifiedArtistDto, SpotifyTrackDto, SpotifyUnknownItemDto } from "./spotify-api.types";
import { CurrentlyPlayingType } from "./spotify-types";

@Injectable({ providedIn: "root" })
export class SpotifyService {
    private readonly apiUrl = "https://api.spotify.com/v1/me/player";
    private readonly _playbackState = signal<SpotifyPlaybackState | null>(null);
    private readonly _localProgressMs = signal(0);
    private readonly _loading = signal(false);
    private readonly _error = signal<string | null>(null);
    public readonly playbackState = this._playbackState.asReadonly();
    public readonly loading = this._loading.asReadonly();
    public readonly error = this._error.asReadonly();
    public readonly isPlaying = computed(() => this._playbackState()?.getIsPlaying() ?? false);
    public readonly localProgressMs = computed(() => this._localProgressMs());
    public readonly progressMs = this.localProgressMs;
    public readonly currentItem = computed(() => this._playbackState()?.getItem() ?? null);
    private playbackSubscription?: Subscription;
    private localProgressSubscription?: Subscription;

    constructor(private readonly http: HttpClient, private readonly auth: SpotifyAuthService) {
        effect(() => {
            if (this.auth.isAuthenticated()) this.startPolling();
            else { this.stopPolling(); this.stopLocalProgressSimulation(); this._playbackState.set(null); this._localProgressMs.set(0); }
        });
    }

    public loadPlaybackState(): void { this.refreshPlaybackState(); }

    public refreshPlaybackState(): void {
        this.stopPolling();
        this.fetchPlaybackState$().subscribe(data => {
            this._playbackState.set(data);
            this.syncLocalProgressWithPlaybackState(data);
        });
        this.startPolling(3000)
    }

    private fetchPlaybackState$(): Observable<SpotifyPlaybackState | null> {
        const token = this.auth.accessToken();
        if (!token) { this._error.set("Kein Spotify Access Token vorhanden."); return EMPTY; }
        this._loading.set(true);
        return this.http.get<SpotifyPlaybackStateDto | null>(this.apiUrl, {
            headers: new HttpHeaders({ Authorization: `Bearer ${token}` })
        }).pipe(
            map(data => data === null ? null : this.mapPlaybackState(data)),
            map(data => { this._error.set(null); return data; }),
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) this.auth.refreshAccessToken();
                this._error.set(error.status === 429 ? "Spotify-Anfrage zu häufig. Polling wird später fortgesetzt." : "Spotify Playback State konnte nicht geladen werden.");
                console.error("Spotify Playback Fehler:", error);
                return EMPTY;
            }),
            finalize(() => this._loading.set(false))
        );
    }

    public startPolling(intervalMs = 3000): void {
        if (this.playbackSubscription) return;
        this.playbackSubscription = interval(intervalMs).pipe(startWith(0), switchMap(() => this.fetchPlaybackState$())).subscribe(data => {
            this._playbackState.set(data);
            this.syncLocalProgressWithPlaybackState(data);
        });
    }

    public stopPolling(): void { this.playbackSubscription?.unsubscribe(); this.playbackSubscription = undefined; }

    private syncLocalProgressWithPlaybackState(data: SpotifyPlaybackState | null): void {
        this.stopLocalProgressSimulation();

        if (!data || !data.getItem()) {
            this._localProgressMs.set(0);
            return;
        }

        const songDurationMs = data.getItem()!.getDurationMs();
        const actualProgressMs = Math.min(data.getProgressMs() ?? 0, songDurationMs);
        this._localProgressMs.set(actualProgressMs);

        if (!data.getIsPlaying() || songDurationMs <= 0) return;

        this.localProgressSubscription = interval(100).subscribe(() => {
            const latestPlaybackState = this._playbackState();
            if (!latestPlaybackState?.getIsPlaying()) {
                const pausedProgress = Math.min(latestPlaybackState?.getProgressMs() ?? this._localProgressMs(), songDurationMs);
                this._localProgressMs.set(pausedProgress);
                this.stopLocalProgressSimulation();
                return;
            }

            const nextProgress = Math.min(this._localProgressMs() + 100, songDurationMs);
            this._localProgressMs.set(nextProgress);
        });
    }

    private stopLocalProgressSimulation(): void {
        this.localProgressSubscription?.unsubscribe();
        this.localProgressSubscription = undefined;
    }

    public pausePlayback(): void {
        const token = this.auth.accessToken();

        if (!token) {
            this._error.set("Kein Spotify Access Token vorhanden.");
            return;
        }

        this._loading.set(true);

        this.http.put(
            `${this.apiUrl}/pause`,
            null,
            {
                headers: new HttpHeaders({
                    Authorization: `Bearer ${token}`
                }),
                responseType: "text"
            }
        ).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    this.auth.refreshAccessToken();
                }

                this._error.set(
                    "Spotify Wiedergabe konnte nicht pausiert werden."
                );

                console.error("Spotify Pause Fehler:", error);
                return EMPTY;
            }),
            finalize(() => this._loading.set(false))
        ).subscribe(() => {
            this._error.set(null);

            this.stopLocalProgressSimulation();
            this.refreshPlaybackState();
        });
    }

    public startPlayback(): void {
        const token = this.auth.accessToken();

        if (!token) {
            this._error.set("Kein Spotify Access Token vorhanden");
            return;
        }

        this._loading.set(true);

        this.http.put(
            `${this.apiUrl}/play`,
            null,
            {
                headers: new HttpHeaders({
                    Authorization: `Bearer ${token}`
                }),
                responseType: "text"
            }
        ).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    this.auth.refreshAccessToken();
                }

                this._error.set(
                    "Spotify Wiedergabe konnte nicht abgespielt werden."
                );

                console.error("Spotify Play Fehler:", error);
                return EMPTY;
            }),
            finalize(() => this._loading.set(false))
        ).subscribe(() => {

            this.stopLocalProgressSimulation();
            this.refreshPlaybackState();
        });
    }

    public skipSong(): void {
        const token = this.auth.accessToken();

        if (!token) {
            this._error.set("Kein Spotify Access Token vorhanden");
            return;
        }

        this._loading.set(true);
        
        this.http.post(
            `${this.apiUrl}/next`,
            null,
            {
                headers: new HttpHeaders({
                    Authorization: `Bearer ${token}`
                }),
                responseType: "text"
            }
        ).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    this.auth.refreshAccessToken();
                }

                this._error.set(
                    "Spotify Song konnte nicht geskippt werden."
                );

                console.error("Spotify Skip Fehler:", error);
                return EMPTY;
            }),
            finalize(() => this._loading.set(false))
        ).subscribe(() => {
            this.stopLocalProgressSimulation();
            this.refreshPlaybackState();
        });
    }

    public prevSong(): void {
        const token = this.auth.accessToken();

        if (!token) {
            this._error.set("Kein Spotify Access Token vorhanden");
            return;
        }

        this._loading.set(true);
        
        this.http.post(
            `${this.apiUrl}/previous`,
            null,
            {
                headers: new HttpHeaders({
                    Authorization: `Bearer ${token}`
                }),
                responseType: "text"
            }
        ).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    this.auth.refreshAccessToken();
                }

                this._error.set(
                    "Spotify Song konnte nicht previous werden."
                );

                console.error("Spotify previous Fehler:", error);
                return EMPTY;
            }),
            finalize(() => this._loading.set(false))
        ).subscribe(() => {
            this.stopLocalProgressSimulation();
            this.refreshPlaybackState();
        });
    }

    public seekPos(positionMs: number): void {
        const token = this.auth.accessToken();

        if (!token) {
            this._error.set("Kein Spotify Access Token vorhanden");
            return;
        }

        this._loading.set(true);
        
        this.http.put(
            `${this.apiUrl}/seek?position_ms=${positionMs}`,
            null,
            {
                headers: new HttpHeaders({
                    Authorization: `Bearer ${token}`
                }),
                responseType: "text"
            }
        ).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    this.auth.refreshAccessToken();
                }

                this._error.set(
                    "Spotify Song konnte nicht geseekt werden."
                );

                console.error("Spotify seek Fehler:", error);
                return EMPTY;
            }),
            finalize(() => this._loading.set(false))
        ).subscribe(() => {
            this.stopLocalProgressSimulation();
            this.refreshPlaybackState();
        });
    }
    

    //#region Mapper
    private mapPlaybackState(data: SpotifyPlaybackStateDto): SpotifyPlaybackState {
        return new SpotifyPlaybackState(this.mapDevice(data.device), data.repeat_state, data.shuffle_state, this.mapContext(data.context), data.timestamp, data.progress_ms ?? null, data.is_playing, this.mapItem(data.item), this.mapCurrentlyPlayingType(data.currently_playing_type), this.mapActions(data.actions));
    }

    private mapCurrentlyPlayingType(value: string): CurrentlyPlayingType {
        return value === "track" || value === "episode" || value === "ad" || value === "unknown" ? value : "unknown";
    }

    private mapActions(data: SpotifyActionsDto | null | undefined): Actions {
        const action = (key: string): boolean => data?.[key] ?? false;
        return new Actions(action("interrupting_playback"), action("pausing"), action("resuming"), action("seeking"), action("skipping_next"), action("skipping_prev"), action("toggling_repeat_context"), action("toggling_shuffle"), action("toggling_repeat_track"), action("transferring_playback"));
    }

    private mapItem(data: SpotifyPlaybackStateDto["item"]): TrackObject | EpisodeObject | null {
        if (!data) return null;
        if (data.type === "track") return this.mapTrack(data as SpotifyTrackDto);
        if (data.type === "episode") return this.mapEpisode(data as SpotifyEpisodeDto);
        console.warn("Unbekannter Spotify Item Type:", data.type);
        return null;
    }

    private mapTrack(data: SpotifyTrackDto): TrackObject {
        return new TrackObject(this.mapAlbum(data.album), this.mapSimplifiedArtists(data.artists ?? []), data.available_markets ?? [], data.disc_number, data.duration_ms, data.explicit, this.mapExternalIds(data.external_ids), this.mapExternalUrls(data.external_urls), data.href, data.id, data.is_playable ?? null, this.mapLinkedFrom(data.linked_from), data.name, data.popularity, data.preview_url ?? null, this.mapRestrictions(data.restrictions), data.track_number, data.type, data.uri, data.is_local);
    }

    private mapEpisode(data: SpotifyEpisodeDto): EpisodeObject {
        return new EpisodeObject(data.audio_preview_url ?? null, data.description, data.html_description, data.duration_ms, data.explicit, this.mapExternalUrls(data.external_urls), data.href, data.id, this.mapImages(data.images ?? []), data.is_externally_hosted ?? null, data.is_playable, data.language ?? null, data.languages ?? [], data.name, data.release_date, data.release_date_precision, this.mapResumePoint(data.resume_point), data.type, data.uri, this.mapRestrictions(data.restrictions), this.mapShow(data.show));
    }

    private mapDevice(data: SpotifyDeviceDto): Device { return new Device(data.id ?? null, data.name, data.is_active, data.is_private_session, data.is_restricted, data.type, data.volume_percent ?? null, data.supports_volume); }

    private mapContext(data: SpotifyContextDto | null | undefined): Context | null { return data ? new Context(data.type, data.href, this.mapExternalUrls(data.external_urls), data.uri) : null; }

    private mapAlbum(data: SpotifyAlbumDto): Album {
        return new Album(data.album_type, data.total_tracks, data.available_markets ?? [], this.mapExternalUrls(data.external_urls), data.href, data.id, this.mapImages(data.images ?? []), data.name, data.release_date, data.release_date_precision, this.mapRestrictions(data.restrictions), data.type, data.uri, this.mapSimplifiedArtists(data.artists ?? []));
    }

    private mapSimplifiedArtists(data: SpotifySimplifiedArtistDto[] | null | undefined): SimplifiedArtist[] {
        if (!Array.isArray(data)) return [];
        return data.map(element => new SimplifiedArtist(this.mapExternalUrls(element.external_urls), element.href, element.id, element.name, element.type, element.uri));
    }

    private mapExternalIds(data: SpotifyExternalIdsDto | null | undefined): ExternalIds { return new ExternalIds(data?.isrc ?? null, data?.ean ?? null, data?.upc ?? null); }
    private mapExternalUrls(data: SpotifyExternalUrlsDto | null | undefined): ExternalUrls { return new ExternalUrls(data?.spotify ?? ""); }

    private mapImages(data: SpotifyImageDto[] | null | undefined): Image[] {
        if (!Array.isArray(data)) return [];
        return data.map(image => new Image(image.url, image.height ?? null, image.width ?? null));
    }

    private mapResumePoint(data: SpotifyResumePointDto | null | undefined): ResumePoint | null { return data ? new ResumePoint(data.fully_played, data.resume_position_ms) : null; }
    private mapRestrictions(data: SpotifyRestrictionsDto | null | undefined): Restrictions | null { return data ? new Restrictions(data.reason) : null; }
    private mapLinkedFrom(data: SpotifyLinkedFromDto | null | undefined): LinkedFrom | null { return data ? new LinkedFrom(this.mapExternalUrls(data.external_urls), data.href, data.id, data.type, data.uri) : null; }

    private mapShow(data: SpotifyShowDto): Show {
        return new Show(data.available_markets ?? [], this.mapCopyrights(data.copyrights ?? []), data.description, data.html_description, data.explicit, this.mapExternalUrls(data.external_urls), data.href, data.id, this.mapImages(data.images ?? []), data.is_externally_hosted ?? null, data.languages ?? [], data.media_type, data.name, data.publisher, data.type, data.uri, data.total_episodes);
    }

    private mapCopyrights(data: SpotifyCopyrightDto[] | null | undefined): Copyright[] {
        if (!Array.isArray(data)) return [];
        return data.map(copyright => new Copyright(copyright.text, copyright.type));
    }

    //#endregion
}
