export class Device {

    private id: string | null;

    private isActive: boolean;

    private isPrivateSession: boolean;

    private isRestricted: boolean;

    private type: string;

    private volumePercent: number | null;

    private supportsVolume: boolean;

    constructor(
        id: string | null,
        isActive: boolean,
        isPrivateSession: boolean,
        isRestricted: boolean,
        type: string,
        volumePercent: number | null,
        supportsVolume: boolean
    ) {
        this.id = id;
        this.isActive = isActive;
        this.isPrivateSession = isPrivateSession;
        this.isRestricted = isRestricted;
        this.type = type;
        this.volumePercent = volumePercent;
        this.supportsVolume = supportsVolume;
    }

    public getId(): string | null {
        return this.id;
    }

    public getIsActive(): boolean {
        return this.isActive;
    }

    public getIsPrivateSession(): boolean {
        return this.isPrivateSession;
    }

    public getIsRestricted(): boolean {
        return this.isRestricted;
    }

    public getType(): string {
        return this.type;
    }

    public getVolumePercent(): number | null {
        return this.volumePercent;
    }

    public getSupportsVolume(): boolean {
        return this.supportsVolume;
    }

    public setId(id: string | null) {
        this.id = id;
    }

    public setIsActive(isActive: boolean) {
        this.isActive = isActive;
    }

    public setIsPrivateSession(isPrivateSession: boolean) {
        this.isPrivateSession = isPrivateSession;
    }

    public setIsRestricted(isRestricted: boolean) {
        this.isRestricted = isRestricted;
    }

    public setType(type: string) {
        this.type = type;
    }

    public setVolumePercent(volumePercent: number | null) {
        this.volumePercent = volumePercent;
    }

    public setSupportsVolume(supportsVolume: boolean) {
        this.supportsVolume = supportsVolume;
    }
}