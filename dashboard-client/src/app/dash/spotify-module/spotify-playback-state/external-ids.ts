export class ExternalIds {

    private isrc: string;
    private ean: string;
    private upc: string;

    public constructor(
        isrc: string,
        ean: string,
        upc: string
    ) {
        this.isrc = isrc;
        this.ean = ean;
        this.upc = upc;
    }

    public getIsrc(): string {
        return this.isrc;
    }

    public getEan(): string {
        return this.ean;
    }

    public getUpc(): string {
        return this.upc;
    }

    public setIsrc(isrc: string) {
        this.isrc = isrc;
    }

    public setEan(ean: string) {
        this.ean = ean;
    }

    public setUpc(upc: string) {
        this.upc = upc;
    }
}