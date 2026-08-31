import { ExternalUrls } from "./external-urls";
import { ArtistObjectType } from "../spotify-types";

export class SimplifiedArtist {
    constructor(
        private externalUrls: ExternalUrls,
        private href: string,
        private id: string,
        private name: string,
        private type: ArtistObjectType,
        private uri: string
    ) {}

    public getExternalUrls(): ExternalUrls { return this.externalUrls; }
    public getHref(): string { return this.href; }
    public getId(): string { return this.id; }
    public getName(): string { return this.name; }
    public getType(): ArtistObjectType { return this.type; }
    public getUri(): string { return this.uri; }
    public setExternalUrls(value: ExternalUrls): void { this.externalUrls = value; }
    public setHref(value: string): void { this.href = value; }
    public setId(value: string): void { this.id = value; }
    public setName(value: string): void { this.name = value; }
    public setType(value: ArtistObjectType): void { this.type = value; }
    public setUri(value: string): void { this.uri = value; }
}
