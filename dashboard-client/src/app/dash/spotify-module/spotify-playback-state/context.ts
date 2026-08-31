import { ExternalUrls } from "./external-urls";
import { ContextType } from "../spotify-types";

export class Context {

    private type: ContextType;

    private href: string;

    private externalUrls: ExternalUrls;

    private uri: string;

    public constructor(
        type: ContextType,
        href: string,
        externalUrls: ExternalUrls,
        uri: string
    ) {
        this.type = type;
        this.href = href;
        this.externalUrls = externalUrls;
        this.uri = uri;
    }

    public getType(): ContextType {
        return this.type;
    }

    public getHref(): string {
        return this.href;
    }

    public getExternalUrls(): ExternalUrls {
        return this.externalUrls;
    }

    public getUri(): string {
        return this.uri;
    }

    public setType(type: ContextType): void {
        this.type = type;
    }

    public setHref(href: string) {
        this.href = href;
    }

    public setExternalUrls(externalUrls: ExternalUrls): void {
        this.externalUrls = externalUrls;
    }

    public setUri(uri: string) {
        this.uri = uri;
    }
}