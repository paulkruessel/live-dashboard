import { Album } from "./album";
import { ExternalIds } from "./external-ids";
import { ExternalUrls } from "./external-urls";
import { Restrictions } from "./restrictions";
import { SimplifiedArtist } from "./SimplifiedArtist";

export class TrackObject {

    private album: Album;
    private artists: SimplifiedArtist[];
    private discNumber: Number;
    private durationMs: Number;
    private explicit: boolean;
    private externalIds: ExternalIds;
    private externalUrls: ExternalUrls;
    private href: string;
    private id: string;
    private isPlayable: boolean | null;
    private linkedFrom: Record<string, unknown> | null;
    private name: string;
    private popularity: number;
    private previewUrl: string | null;
    private restrictions: Restrictions | null;
    private trackNumber: number;
    private type: string;
    private uri: string;
    private isLocal: boolean;

    constructor(
        album: Album,
        artists: SimplifiedArtist[],
        discNumber: Number,
        durationMs: Number,
        explicit: boolean,
        externalIds: ExternalIds,
        externalUrls: ExternalUrls,
        href: string,
        id: string,
        isPlayable: boolean | null,
        linkedFrom: Record<string, unknown> | null,
        name: string,
        popularity: number,
        previewUrl: string | null,
        restrictions: Restrictions | null,
        trackNumber: number,
        type: string,
        uri: string,
        isLocal: boolean
    ) {
        this.album = album;
        this.artists = artists;
        this.discNumber = discNumber;
        this.durationMs = durationMs;
        this.explicit = explicit;
        this.externalIds = externalIds;
        this.externalUrls = externalUrls;
        this.href = href;
        this.id = id;
        this.isPlayable = isPlayable;
        this.linkedFrom = linkedFrom;
        this.name = name;
        this.popularity = popularity;
        this.previewUrl = previewUrl;
        this.restrictions = restrictions;
        this.trackNumber = trackNumber;
        this.type = type;
        this.uri = uri;
        this.isLocal = isLocal;
    }

    public getAlbum(): Album {
        return this.album;
    }

    public setAlbum(album: Album): void {
        this.album = album;
    }

    public getArtists(): SimplifiedArtist[] {
        return this.artists;
    }

    public setArtists(artists: SimplifiedArtist[]): void {
        this.artists = artists;
    }

    public getDiscNumber(): Number {
        return this.discNumber;
    }

    public setDiscNumber(discNumber: Number): void {
        this.discNumber = discNumber;
    }

    public getDurationMs(): Number {
        return this.durationMs;
    }

    public setDurationMs(durationMs: Number): void {
        this.durationMs = durationMs;
    }

    public getExplicit(): boolean {
        return this.explicit;
    }

    public setExplicit(explicit: boolean): void {
        this.explicit = explicit;
    }

    public getExternalIds(): ExternalIds {
        return this.externalIds;
    }

    public setExternalIds(externalIds: ExternalIds): void {
        this.externalIds = externalIds;
    }

    public getExternalUrls(): ExternalUrls {
        return this.externalUrls;
    }

    public setExternalUrls(externalUrls: ExternalUrls): void {
        this.externalUrls = externalUrls;
    }

    public getHref(): string {
        return this.href;
    }

    public setHref(href: string): void {
        this.href = href;
    }

    public getId(): string {
        return this.id;
    }

    public setId(id: string): void {
        this.id = id;
    }

    public getIsPlayable(): boolean | null {
        return this.isPlayable;
    }

    public setIsPlayable(isPlayable: boolean | null): void {
        this.isPlayable = isPlayable;
    }

    public getLinkedFrom(): Record<string, unknown> | null {
        return this.linkedFrom;
    }

    public setLinkedFrom(linkedFrom: Record<string, unknown> | null): void {
        this.linkedFrom = linkedFrom;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getPopularity(): number {
        return this.popularity;
    }

    public setPopularity(popularity: number): void {
        this.popularity = popularity;
    }

    public getPreviewUrl(): string | null {
        return this.previewUrl;
    }

    public setPreviewUrl(previewUrl: string | null): void {
        this.previewUrl = previewUrl;
    }

    public getRestrictions(): Restrictions | null {
        return this.restrictions;
    }

    public setRestrictions(restrictions: Restrictions | null): void {
        this.restrictions = restrictions;
    }

    public getTrackNumber(): number {
        return this.trackNumber;
    }

    public setTrackNumber(trackNumber: number): void {
        this.trackNumber = trackNumber;
    }

    public getType(): string {
        return this.type;
    }

    public setType(type: string): void {
        this.type = type;
    }

    public getUri(): string {
        return this.uri;
    }

    public setUri(uri: string): void {
        this.uri = uri;
    }

    public getIsLocal(): boolean {
        return this.isLocal;
    }

    public setIsLocal(isLocal: boolean): void {
        this.isLocal = isLocal;
    }
}