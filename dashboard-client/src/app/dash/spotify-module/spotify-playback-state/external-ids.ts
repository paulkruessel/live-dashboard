export class ExternalIds {

    private isrc: string | null;
    private ean: string | null;
    private upc: string | null;

    public constructor(
        isrc: string | null,
        ean: string | null,
        upc: string | null
    ) {
        this.isrc = isrc;
        this.ean = ean;
        this.upc = upc;
    }

    public getIsrc(): string | null {
        return this.isrc;
    }

    public getEan(): string | null {
        return this.ean;
    }

    public getUpc(): string | null {
        return this.upc;
    }

    public setIsrc(isrc: string | null) {
        this.isrc = isrc;
    }

    public setEan(ean: string | null) {
        this.ean = ean;
    }

    public setUpc(upc: string | null) {
        this.upc = upc;
    }
}