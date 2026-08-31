import { HttpClient, HttpHeaders } from "@angular/common/http";
import { computed, Injectable, signal } from "@angular/core";
import { SpotifyPlaybackState } from "./spotify-playback-state/spotify-playback-state";
import { catchError, EMPTY, interval, startWith, Subscription, switchMap } from "rxjs";
import { Actions } from "./spotify-playback-state/actions";
import { EpisodeObject } from "./spotify-playback-state/episode-object";
import { TrackObject } from "./spotify-playback-state/track-object";
import { Device } from "./spotify-playback-state/device";
import { Context } from "./spotify-playback-state/context";
import { Album } from "./spotify-playback-state/album";
import { SimplifiedArtist } from "./spotify-playback-state/SimplifiedArtist";
import { ExternalIds } from "./spotify-playback-state/external-ids";
import { ExternalUrls } from "./spotify-playback-state/external-urls";
import { Image } from "./spotify-playback-state/image";
import { ResumePoint } from "./spotify-playback-state/resume-point";
import { Restrictions } from "./spotify-playback-state/restrictions";
import { Show } from "./spotify-playback-state/show";
import { Copyright } from "./spotify-playback-state/copyrights";
import { SpotifyAuthService } from "./auth/auth-service";

@Injectable({
    providedIn: 'root'
})
export class SpotifyService {

    private readonly apiUrl = "https://api.spotify.com/v1/me/player";

    private readonly _accessToken = signal<string | null>(null);

    private readonly _playbackState = signal<SpotifyPlaybackState | null>(null)

    private readonly _loading = signal<boolean>(false);
    
    private readonly _error = signal<string | null>(null);


    public readonly playbackState = this._playbackState.asReadonly();

    public readonly loading = this._loading.asReadonly();

    public readonly error = this._error.asReadonly();


    public readonly isPlaying = computed(() => {
        return this._playbackState()?.getIsPlaying() ?? false;
    });

    public readonly progressMs = computed(() => {
        return this._playbackState()?.getProgressMs() ?? 0;
    });

    public readonly currentItem = computed(() => {
        return this._playbackState()?.getItem() ?? null;
    });

    
    private playbackSubscription?: Subscription;


    constructor(
        private readonly http: HttpClient,
        private readonly auth: SpotifyAuthService
    ) {}

    public setAccessToken(token: string): void {
        this._accessToken.set(token);
    }

    public clearAccessToken(): void {
        this._accessToken.set(null);
        this.stopPolling();
        this._playbackState.set(null);
    }

    public loadPlaybackState(): void {

        const token =
            this.auth.accessToken();


        if (!token) {

            console.error(
                "Kein Spotify Access Token."
            );

            return;
        }


        this.http.get(
            "https://api.spotify.com/v1/me/player",
            {
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        )
        .subscribe({

            next: data => {

                console.log(
                    "Playback:",
                    data
                );
            },

            error: error => {

                console.error(
                    error
                );
            }
        });
    }

    public startPolling(
        intervalMs: number = 3000
    ): void {

        this.stopPolling();

        this.playbackSubscription = interval(
            intervalMs
        ).pipe(

            startWith(0),

            switchMap(() => {

                const token = this._accessToken();

                if (!token) {

                    this._error.set(
                        "Kein Spotify Access Token vorhanden."
                    );

                    return EMPTY;
                }

                const headers = new HttpHeaders({
                    Authorization: `Bearer ${token}`
                });

                return this.http.get<any>(
                    `${this.apiUrl}?additional_types=track,episode`,
                    {
                        headers
                    }
                ).pipe(

                    catchError(error => {

                        console.error(
                            "Spotify Polling Fehler:",
                            error
                        );

                        return EMPTY;
                    })
                );
            })
        ).subscribe(data => {

            if (!data) {
                this._playbackState.set(null);

                return;
            }

            const playbackState = this.mapPlaybackState(data);

            this._playbackState.set(playbackState);
        });
    }

    public stopPolling(): void {
        this.playbackSubscription?.unsubscribe();

        this.playbackSubscription = undefined;
    }

    private mapPlaybackState(data: any): SpotifyPlaybackState {
        return new SpotifyPlaybackState(

            this.mapDevice(data.device),

            data.repeat_state,

            data.shuffle_state,

            this.mapContext(data.context),

            data.timestamp,

            data.progress_ms,

            data.is_playing,

            this.mapItem(data.item),

            this.mapActions(data.actions)
        )
    }

    private mapActions(
        data: any
    ): Actions {

        return new Actions(

            data?.interrupting_playback ?? false,

            data?.pausing ?? false,

            data?.resuming ?? false,

            data?.seeking ?? false,

            data?.skipping_next ?? false,

            data?.skipping_prev ?? false,

            data?.toggling_repeat_context ?? false,

            data?.toggling_shuffle ?? false,

            data?.toggling_repeat_track ?? false,

            data?.transferring_playback ?? false
        );
    }

    
    private mapItem(
        data: any
    ): TrackObject | EpisodeObject {

        if (!data) {
            throw new Error(
                "Spotify Playback enthält kein Item."
            );
        }

        if (data.type === "track") {
            return this.mapTrack(data);
        }

        if (data.type === "episode") {
            return this.mapEpisode(data);
        }

        throw new Error(
            `Unbekannter Spotify Item Type: ${data.type}`
        );
    }

    private mapTrack(
        data: any
    ): TrackObject {

        return new TrackObject(

            this.mapAlbum(data.album),

            data.artists.map(
                (artist: any) =>
                    this.mapSimplifiedArtist(artist)
            ),

            data.disc_number,

            data.duration_ms,

            data.explicit,

            this.mapExternalIds(
                data.external_ids
            ),

            this.mapExternalUrls(
                data.external_urls
            ),

            data.href,

            data.id,

            data.is_playable ?? true,

            data.linked_from ?? {},

            data.name,

            data.popularity,

            data.preview_url,

            data.track_number,

            data.type,

            data.uri,

            data.is_local
        );
    }

    private mapEpisode(
        data: any
    ): EpisodeObject {

        return new EpisodeObject(

            data.audio_preview_url,

            data.description,

            data.html_description,

            data.duration_ms,

            data.explicit,

            this.mapExternalUrls(
                data.external_urls
            ),

            data.href,

            data.id,

            data.images.map(
                (image: any) =>
                    this.mapImage(image)
            ),

            data.is_externally_hosted,

            data.is_playable,

            data.language,

            data.languages,

            data.name,

            data.release_date,

            data.release_date_precision,

            this.mapResumePoint(
                data.resume_point
            ),

            "episode",

            data.uri,

            this.mapRestrictions(
                data.restrictions
            ),

            this.mapShow(data.show)
        );
    }

    
    private mapDevice(data: any): Device {

        return new Device(
            data.id,

            data.is_active,

            data.is_private_session,

            data.is_restricted,

            data.type,

            data.volume_percent,

            data.supports_volume
        )
    }

    private mapContext(data: any): Context {
        return new Context(
            data.type,

            data.href,

            this.mapExternalUrls(data.external_urls),

            data.uri
        );
    }

    private mapAlbum(data: any): Album {
        return new Album(
            data.album_type,

            data.total_tracks,

            data.available_markets,

            this.mapExternalUrls(data.external_urls),

            data.href,

            data.id,

            this.mapImage(data.images),

            data.name,

            data.release_date,
            
            data.release_date_precision,

            this.mapRestrictions(data.restrictions),

            data.type,

            data.uri,

            this.mapSimplifiedArtist(data.simplified_artists)
        );
    }

    private mapSimplifiedArtist(data: any[]): SimplifiedArtist[] {

        return data.map(element => {
            return new SimplifiedArtist(
                this.mapExternalUrls(element.external_urls),
                element.href,
                element.id,
                element.name,
                element.type,
                element.uri
            )
        });
    }

    private mapExternalIds(data: any): any {
        return new ExternalIds(
            data.isrc,
            data.ean,
            data.upc
        );
    }

    private mapExternalUrls(data: any): any {
        return new ExternalUrls(
            data.spotify
        );
    }

    private mapImage(data: any[]): Image[] {
        return data.map(i => {
            return new Image(
                i.url,
                i.width,
                i.height
            )
        })
    }

    private mapResumePoint(data: any): ResumePoint {
        return new ResumePoint(
            data.fully_played,
            data.resume_position_ms
        );
    }

    private mapRestrictions(data: any): Restrictions {
        return new Restrictions(
            data.reason
        );
    }

    private mapShow(data: any): Show {
        return new Show(
            data.available_markets,
            this.mapCopyright(data.copyrights),
            data.description,
            data.html_description,
            data.explicit,
            this.mapExternalUrls(data.external_urls),
            data.href,
            this.mapImage(data.images),
            data.is_externally_hosted,
            data.languages,
            data.media_type,
            data.name,
            data.publisher,
            data.type,
            data.uri,
            data.total_episodes
        );
    }

    private mapCopyright(data: any[]): Copyright[] {
        return data.map(c => {
            return new Copyright(
                c.text,
                c.type
            );
        });
    }
}