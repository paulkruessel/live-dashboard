import { ExternalUrls } from "./external-urls";
import { Image } from "./image";
import { Restrictions } from "./restrictions";
import { ResumePoint } from "./resume-point";
import { Show } from "./show";

export class EpisodeObject {

    private audioPreviewUrl: string;
    private description: string;
    private htmlDescription: string;
    private durationMs: number;
    private explicit: boolean;
    private externalUrls: ExternalUrls;
    private href: string;
    private id: string;
    private images: Image[];
    private isExternallyHosted: boolean;
    private isPlayable: boolean;
    private language: string;
    private languages: string[];
    private name: string;
    private releaseDate: string;
    private releaseDatePrecision: "year" | "month" | "day";
    private resumePoint: ResumePoint;
    private type: "episode";
    private uri: string;
    private restrictions: Restrictions | null;
    private show: Show;

    constructor(
        audioPreviewUrl: string,
        description: string,
        htmlDescription: string,
        durationMs: number,
        explicit: boolean,
        externalUrls: ExternalUrls,
        href: string,
        id: string,
        images: Image[],
        isExternallyHosted: boolean,
        isPlayable: boolean,
        language: string,
        languages: string[],
        name: string,
        releaseDate: string,
        releaseDatePrecision: "year" | "month" | "day",
        resumePoint: ResumePoint,
        type: "episode",
        uri: string,
        restrictions: Restrictions | null,
        show: Show
    ) {
        this.audioPreviewUrl = audioPreviewUrl;
        this.description = description;
        this.htmlDescription = htmlDescription;
        this.durationMs = durationMs;
        this.explicit = explicit;
        this.externalUrls = externalUrls;
        this.href = href;
        this.id = id;
        this.images = images;
        this.isExternallyHosted = isExternallyHosted;
        this.isPlayable = isPlayable;
        this.language = language;
        this.languages = languages;
        this.name = name;
        this.releaseDate = releaseDate;
        this.releaseDatePrecision = releaseDatePrecision;
        this.resumePoint = resumePoint;
        this.type = type;
        this.uri = uri;
        this.restrictions = restrictions;
        this.show = show;
    }

    public getAudioPreviewUrl(): string {
        return this.audioPreviewUrl;
    }

    public setAudioPreviewUrl(audioPreviewUrl: string): void {
        this.audioPreviewUrl = audioPreviewUrl;
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

    public getDurationMs(): number {
        return this.durationMs;
    }

    public setDurationMs(durationMs: number): void {
        this.durationMs = durationMs;
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

    public getIsExternallyHosted(): boolean {
        return this.isExternallyHosted;
    }

    public setIsExternallyHosted(isExternallyHosted: boolean): void {
        this.isExternallyHosted = isExternallyHosted;
    }

    public getIsPlayable(): boolean {
        return this.isPlayable;
    }

    public setIsPlayable(isPlayable: boolean): void {
        this.isPlayable = isPlayable;
    }

    public getLanguage(): string {
        return this.language;
    }

    public setLanguage(language: string): void {
        this.language = language;
    }

    public getLanguages(): string[] {
        return this.languages;
    }

    public setLanguages(languages: string[]): void {
        this.languages = languages;
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

    public getReleaseDatePrecision(): "year" | "month" | "day" {
        return this.releaseDatePrecision;
    }

    public setReleaseDatePrecision(
        releaseDatePrecision: "year" | "month" | "day"
    ): void {
        this.releaseDatePrecision = releaseDatePrecision;
    }

    public getResumePoint(): ResumePoint {
        return this.resumePoint;
    }

    public setResumePoint(resumePoint: ResumePoint): void {
        this.resumePoint = resumePoint;
    }

    public getType(): "episode" {
        return this.type;
    }

    public setType(type: "episode"): void {
        this.type = type;
    }

    public getUri(): string {
        return this.uri;
    }

    public setUri(uri: string): void {
        this.uri = uri;
    }

    public getRestrictions(): Restrictions | null {
        return this.restrictions;
    }

    public setRestrictions(restrictions: Restrictions | null): void {
        this.restrictions = restrictions;
    }

    public getShow(): Show {
        return this.show;
    }

    public setShow(show: Show): void {
        this.show = show;
    }
}