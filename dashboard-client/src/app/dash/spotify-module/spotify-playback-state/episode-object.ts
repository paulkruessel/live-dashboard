import { ExternalUrls } from "./external-urls";
import { Image } from "./image";
import { Restrictions } from "./restrictions";
import { ResumePoint } from "./resume-point";
import { Show } from "./show";
import { EpisodeObjectType, ReleaseDatePrecision } from "../spotify-types";

export class EpisodeObject {

    private audioPreviewUrl: string | null;
    private description: string;
    private htmlDescription: string;
    private durationMs: number;
    private explicit: boolean;
    private externalUrls: ExternalUrls;
    private href: string;
    private id: string;
    private images: Image[];
    private isExternallyHosted: boolean | null;
    private isPlayable: boolean;
    private language: string | null;
    private languages: string[];
    private name: string;
    private releaseDate: string;
    private releaseDatePrecision: ReleaseDatePrecision;
    private resumePoint: ResumePoint | null;
    private type: "episode";
    private uri: string;
    private restrictions: Restrictions | null;
    private show: Show;

    constructor(
        audioPreviewUrl: string | null,
        description: string,
        htmlDescription: string,
        durationMs: number,
        explicit: boolean,
        externalUrls: ExternalUrls,
        href: string,
        id: string,
        images: Image[],
        isExternallyHosted: boolean | null,
        isPlayable: boolean,
        language: string | null,
        languages: string[],
        name: string,
        releaseDate: string,
        releaseDatePrecision: ReleaseDatePrecision,
        resumePoint: ResumePoint | null,
        type: EpisodeObjectType,
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

    public getAudioPreviewUrl(): string | null {
        return this.audioPreviewUrl;
    }

    public setAudioPreviewUrl(audioPreviewUrl: string | null): void {
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

    public getIsExternallyHosted(): boolean | null {
        return this.isExternallyHosted;
    }

    public setIsExternallyHosted(isExternallyHosted: boolean | null): void {
        this.isExternallyHosted = isExternallyHosted;
    }

    public getIsPlayable(): boolean {
        return this.isPlayable;
    }

    public setIsPlayable(isPlayable: boolean): void {
        this.isPlayable = isPlayable;
    }

    public getLanguage(): string | null {
        return this.language;
    }

    public setLanguage(language: string | null): void {
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

    public getReleaseDatePrecision(): ReleaseDatePrecision {
        return this.releaseDatePrecision;
    }

    public setReleaseDatePrecision(
        releaseDatePrecision: ReleaseDatePrecision
    ): void {
        this.releaseDatePrecision = releaseDatePrecision;
    }

    public getResumePoint(): ResumePoint | null {
        return this.resumePoint;
    }

    public setResumePoint(resumePoint: ResumePoint | null): void {
        this.resumePoint = resumePoint;
    }

    public getType(): EpisodeObjectType {
        return this.type;
    }

    public setType(type: EpisodeObjectType): void {
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