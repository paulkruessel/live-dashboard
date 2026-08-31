import { ExternalUrls } from "./external-urls";
import { Image } from "./image";
import { Restrictions } from "./restrictions";
import { SimplifiedArtist } from "./simplified-artist";
import { AlbumType, ReleaseDatePrecision, AlbumObjectType } from "../spotify-types";

export class Album {

    private albumType: AlbumType;
    private totalTracks: number;
    private availableMarkets: string[];
    private externalUrls: ExternalUrls;
    private href: string;
    private id: string;
    private images: Image[];
    private name: string;
    private releaseDate: string;
    private releaseDatePrecision: ReleaseDatePrecision;
    private restrictions: Restrictions | null;
    private type: AlbumObjectType;
    private uri: string;
    private artists: SimplifiedArtist[];

    constructor(
        albumType: AlbumType,
        totalTracks: number,
        availableMarkets: string[],
        externalUrls: ExternalUrls,
        href: string,
        id: string,
        images: Image[],
        name: string,
        releaseDate: string,
        releaseDatePrecision: ReleaseDatePrecision,
        restrictions: Restrictions | null,
        type: AlbumObjectType,
        uri: string,
        artists: SimplifiedArtist[]
    ) {
        this.albumType = albumType;
        this.totalTracks = totalTracks;
        this.availableMarkets = availableMarkets;
        this.externalUrls = externalUrls;
        this.href = href;
        this.id = id;
        this.images = images;
        this.name = name;
        this.releaseDate = releaseDate;
        this.releaseDatePrecision = releaseDatePrecision;
        this.restrictions = restrictions;
        this.type = type;
        this.uri = uri;
        this.artists = artists;
    }

    public getAlbumType(): AlbumType {
        return this.albumType;
    }

    public setAlbumType(albumType: AlbumType): void {
        this.albumType = albumType;
    }

    public getTotalTracks(): number {
        return this.totalTracks;
    }

    public setTotalTracks(totalTracks: number): void {
        this.totalTracks = totalTracks;
    }

    public getAvailableMarkets(): string[] {
        return this.availableMarkets;
    }

    public setAvailableMarkets(availableMarkets: string[]): void {
        this.availableMarkets = availableMarkets;
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

    public getImages(): Image[] {
        return this.images;
    }

    public setImages(images: Image[]): void {
        this.images = images;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getReleaseDate(): string {
        return this.releaseDate;
    }

    public setReleaseDate(releaseDate: string): void {
        this.releaseDate = releaseDate;
    }

    public getReleaseDatePrecision(): ReleaseDatePrecision {
        return this.releaseDatePrecision;
    }

    public setReleaseDatePrecision(releaseDatePrecision: ReleaseDatePrecision): void {
        this.releaseDatePrecision = releaseDatePrecision;
    }

    public getRestrictions(): Restrictions | null {
        return this.restrictions;
    }

    public setRestrictions(restrictions: Restrictions | null): void {
        this.restrictions = restrictions;
    }

    public getType(): AlbumObjectType {
        return this.type;
    }

    public setType(type: AlbumObjectType): void {
        this.type = type;
    }

    public getUri(): string {
        return this.uri;
    }

    public setUri(uri: string): void {
        this.uri = uri;
    }

    public getArtists(): SimplifiedArtist[] {
        return this.artists;
    }

    public setArtists(artists: SimplifiedArtist[]): void {
        this.artists = artists;
    }
}