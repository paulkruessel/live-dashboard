import { ExternalUrls } from "./external-urls";

export class Context {

    private type: string;

    private href: string;

    private exportUrls: ExternalUrls;

    private uri: string;

    public constructor(
        type: string,
        href: string,
        exportUrls: ExternalUrls,
        uri: string
    ) {
        this.type = type;
        this.href = href;
        this.exportUrls = exportUrls;
        this.uri = uri;
    }

    public getType(): string {
        return this.type;
    }

    public getHref(): string {
        return this.href;
    }

    public getExportUrls(): ExternalUrls {
        return this.exportUrls;
    }

    public getUri(): string {
        return this.uri;
    }

    public setType(type: string) {
        this.type = type;
    }

    public setHref(href: string) {
        this.href = href;
    }

    public setExportUrls(exportUrls: ExternalUrls) {
        this.exportUrls = exportUrls;
    }

    public setUri(uri: string) {
        this.uri = uri;
    }
}