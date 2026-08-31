import { Copyright } from "./copyrights";
import { ExternalUrls } from "./external-urls";
import { Image } from "./image";

export class Show {

    private availableMarkets: string[];
    private copyrights: Copyright[];
    private description: string;
    private htmlDescription: string;
    private explicit: boolean;
    private externalUrls: ExternalUrls;
    private href: string;
    private images: Image[];
    private isExternallyHosted: boolean | null;
    private languages: string[];
    private mediaType: string;
    private name: string;
    private publisher: string;
    private type: string;
    private uri: string;
    private totalEpisodes: number;

    constructor(
        availableMarkets: string[],
        copyrights: Copyright[],
        description: string,
        htmlDescription: string,
        explicit: boolean,
        externalUrls: ExternalUrls,
        href: string,
        images: Image[],
        isExternallyHosted: boolean | null,
        languages: string[],
        mediaType: string,
        name: string,
        publisher: string,
        type: string,
        uri: string,
        totalEpisodes: number
    ) {
        this.availableMarkets = availableMarkets;
        this.copyrights = copyrights;
        this.description = description;
        this.htmlDescription = htmlDescription;
        this.explicit = explicit;
        this.externalUrls = externalUrls;
        this.href = href;
        this.images = images;
        this.isExternallyHosted = isExternallyHosted;
        this.languages = languages;
        this.mediaType = mediaType;
        this.name = name;
        this.publisher = publisher;
        this.type = type;
        this.uri = uri;
        this.totalEpisodes = totalEpisodes;
    }

    public getAvailableMarkets(): string[] {
        return this.availableMarkets;
    }

    public setAvailableMarkets(availableMarkets: string[]): void {
        this.availableMarkets = availableMarkets;
    }

    public getCopyrights(): Copyright[] {
        return this.copyrights;
    }

    public setCopyrights(copyrights: Copyright[]): void {
        this.copyrights = copyrights;
    }

    public getDescription(): string {
        return this.description;
    }

    public setDescription(description: string): void {
        this.description = description;
    }

    public getHtmlDescription(): string {
        return this.htmlDescription;
    }

    public setHtmlDescription(htmlDescription: string): void {
        this.htmlDescription = htmlDescription;
    }

    public getExplicit(): boolean {
        return this.explicit;
    }

    public setExplicit(explicit: boolean): void {
        this.explicit = explicit;
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

    public getImages(): Image[] {
        return this.images;
    }

    public setImages(images: Image[]): void {
        this.images = images;
    }

    public getIsExternallyHosted(): boolean | null {
        return this.isExternallyHosted;
    }

    public setIsExternallyHosted(isExternallyHosted: boolean | null): void {
        this.isExternallyHosted = isExternallyHosted;
    }

    public getLanguages(): string[] {
        return this.languages;
    }

    public setLanguages(languages: string[]): void {
        this.languages = languages;
    }

    public getMediaType(): string {
        return this.mediaType;
    }

    public setMediaType(mediaType: string): void {
        this.mediaType = mediaType;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getPublisher(): string {
        return this.publisher;
    }

    public setPublisher(publisher: string): void {
        this.publisher = publisher;
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

    public getTotalEpisodes(): number {
        return this.totalEpisodes;
    }

    public setTotalEpisodes(totalEpisodes: number): void {
        this.totalEpisodes = totalEpisodes;
    }
}