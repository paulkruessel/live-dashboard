import {
    AlbumObjectType,
    AlbumType,
    ArtistObjectType,
    ContextType,
    CopyrightType,
    EpisodeObjectType,
    ReleaseDatePrecision,
    RepeatState,
    ShowObjectType,
    TrackObjectType
} from "./spotify-types";

export interface SpotifyExternalUrlsDto { spotify?: string; [key: string]: string | undefined; }
export interface SpotifyExternalIdsDto { isrc?: string; ean?: string; upc?: string; }
export interface SpotifyImageDto { url: string; height?: number | null; width?: number | null; }
export interface SpotifyRestrictionsDto { reason: string; }
export interface SpotifyResumePointDto { fully_played: boolean; resume_position_ms: number; }
export interface SpotifyCopyrightDto { text: string; type: CopyrightType; }
export interface SpotifySimplifiedArtistDto {
    external_urls?: SpotifyExternalUrlsDto; href: string; id: string; name: string;
    type: ArtistObjectType; uri: string;
}
export interface SpotifyLinkedFromDto {
    external_urls?: SpotifyExternalUrlsDto; href: string; id: string;
    type: TrackObjectType; uri: string;
}
export interface SpotifyAlbumDto {
    album_type: AlbumType; total_tracks: number;
    /** @deprecated Spotify may remove this field in a future API version. */
    available_markets?: string[];
    external_urls?: SpotifyExternalUrlsDto; href: string; id: string; images?: SpotifyImageDto[];
    name: string; release_date: string; release_date_precision: ReleaseDatePrecision;
    restrictions?: SpotifyRestrictionsDto; type: AlbumObjectType; uri: string;
    artists?: SpotifySimplifiedArtistDto[];
}
export interface SpotifyTrackDto {
    album: SpotifyAlbumDto; artists?: SpotifySimplifiedArtistDto[];
    /** @deprecated Spotify may remove this field in a future API version. */
    available_markets?: string[];
    disc_number: number; duration_ms: number; explicit: boolean; external_ids?: SpotifyExternalIdsDto;
    external_urls?: SpotifyExternalUrlsDto; href: string; id: string; is_playable?: boolean;
    /** @deprecated Spotify may remove this field in a future API version. */
    linked_from?: SpotifyLinkedFromDto; name: string; popularity: number; preview_url?: string;
    restrictions?: SpotifyRestrictionsDto; track_number: number; type: TrackObjectType;
    uri: string; is_local: boolean;
}
export interface SpotifyShowDto {
    available_markets?: string[]; copyrights?: SpotifyCopyrightDto[]; description: string;
    html_description: string; explicit: boolean; external_urls?: SpotifyExternalUrlsDto;
    href: string; id: string; images?: SpotifyImageDto[]; is_externally_hosted?: boolean;
    languages?: string[]; media_type: string; name: string; publisher: string;
    type: ShowObjectType; uri: string; total_episodes: number;
}
export interface SpotifyEpisodeDto {
    audio_preview_url?: string; description: string; html_description: string; duration_ms: number;
    explicit: boolean; external_urls?: SpotifyExternalUrlsDto; href: string; id: string;
    images?: SpotifyImageDto[]; is_externally_hosted?: boolean; is_playable: boolean;
    language?: string; languages?: string[]; name: string; release_date: string;
    release_date_precision: ReleaseDatePrecision; resume_point?: SpotifyResumePointDto;
    type: EpisodeObjectType; uri: string; restrictions?: SpotifyRestrictionsDto; show: SpotifyShowDto;
}
export interface SpotifyUnknownItemDto { type: string; }
export interface SpotifyDeviceDto {
    id?: string | null; name: string; is_active: boolean; is_private_session: boolean;
    is_restricted: boolean; type: string; volume_percent?: number | null; supports_volume: boolean;
}
export interface SpotifyContextDto { type: ContextType; href: string; external_urls?: SpotifyExternalUrlsDto; uri: string; }
export interface SpotifyActionsDto { [key: string]: boolean | undefined; }
export interface SpotifyPlaybackStateDto {
    device: SpotifyDeviceDto; repeat_state: RepeatState; shuffle_state: boolean;
    context?: SpotifyContextDto | null; timestamp: number; progress_ms?: number | null;
    is_playing: boolean; currently_playing_type: string; item?: SpotifyTrackDto | SpotifyEpisodeDto | SpotifyUnknownItemDto | null;
    actions?: SpotifyActionsDto;
}
