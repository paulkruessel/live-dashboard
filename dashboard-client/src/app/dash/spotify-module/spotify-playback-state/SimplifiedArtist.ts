import { ExternalUrls } from "./external-urls";

export class SimplifiedArtist {

    private externalUrls: ExternalUrls;

    private href: string;

    private id: string;

    private name: string;

    private type: string;

    private uri: string;

    public constructor(
        externalUrls: ExternalUrls,
        href: string,
        id: string,
        name: string,
        type: string,
        uri: string
    ) {
        this.externalUrls = externalUrls;
        this.href = href;
        this.id = id;
        this.name = name;
        this.type = type;
        this.uri = uri;
    }

    public getExternalUrls(): ExternalUrls {
        return this.externalUrls;
    }

    public getHref(): string {
        return this.href;
    }

    public getId(): string {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public getType(): string {
        return this.type;
    }

    public getUri(): string {
        return this.uri;
    }

    public setExternalUrls(externalUrls: ExternalUrls) {
        this.externalUrls = externalUrls;
    }

    public setHref(href: string) {
        this.href = href;
    }

    public setId(id: string) {
        this.id = id;
    }

    public setName(name: string) {
        this.name = name;
    }

    public setType(type: string) {
        this.type = type;
    }

    public setUri(uri: string) {
        this.uri = uri;
    }
}