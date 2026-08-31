import { ExternalUrls } from "./external-urls";

export class LinkedFrom {
    constructor(
        private externalUrls: ExternalUrls,
        private href: string,
        private id: string,
        private type: "track",
        private uri: string
    ) {}

    public getExternalUrls(): ExternalUrls { return this.externalUrls; }
    public setExternalUrls(value: ExternalUrls): void { this.externalUrls = value; }
    public getHref(): string { return this.href; }
    public setHref(value: string): void { this.href = value; }
    public getId(): string { return this.id; }
    public setId(value: string): void { this.id = value; }
    public getType(): "track" { return this.type; }
    public setType(value: "track"): void { this.type = value; }
    public getUri(): string { return this.uri; }
    public setUri(value: string): void { this.uri = value; }
}
