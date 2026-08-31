import { ExternalUrls } from "./external-urls";
import { Image } from "./image";
import { Restrictions } from "./restrictions";
import { SimplifiedArtist } from "./SimplifiedArtist";

export class Album {

    private albumType: string;
    private totalTracks: number;
    private availableMarkets: string[];
    private externalUrls: ExternalUrls;
    private href: string;
    private id: string;
    private images: Image[];
    private name: string;
    private releaseDate: string;
    private releaseDatePrecision: string;
    private restrictions: Restrictions | null;
    private type: string;
    private uri: string;
    private artists: SimplifiedArtist[];

    constructor(
        albumType: string,
        totalTracks: number,
        availableMarkets: string[],
        externalUrls: ExternalUrls,
        href: string,
        id: string,
        images: Image[],
        name: string,
        releaseDate: string,
        releaseDatePrecision: string,
        restrictions: Restrictions | null,
        type: string,
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

    public getAlbumType(): string {
        return this.albumType;
    }

    public setAlbumType(albumType: string): void {
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

    public getReleaseDatePrecision(): string {
        return this.releaseDatePrecision;
    }

    public setReleaseDatePrecision(releaseDatePrecision: string): void {
        this.releaseDatePrecision = releaseDatePrecision;
    }

    public getRestrictions(): Restrictions | null {
        return this.restrictions;
    }

    public setRestrictions(restrictions: Restrictions | null): void {
        this.restrictions = restrictions;
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

    public getArtists(): SimplifiedArtist[] {
        return this.artists;
    }

    public setArtists(artists: SimplifiedArtist[]): void {
        this.artists = artists;
    }
}