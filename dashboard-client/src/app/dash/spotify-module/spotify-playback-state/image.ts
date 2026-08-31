export class Image {
    
    private url: string;

    private height: number | null;

    private width: number | null;

    public constructor(
        url: string,
        height: number | null,
        width: number | null
    ) {
        this.url = url;
        this.height = height;
        this.width = width;
    }

    public getUrl(): string {
        return this.url;
    }

    public getHeight(): number | null {
        return this.height;
    }

    public getWidth(): number | null {
        return this.width;
    }

    public setUrl(url: string) {
        this.url = url;
    }

    public setHeight(height: number | null) {
        this.height = height;
    }

    public setWidth(width: number | null) {
        this.width = width;
    }
}