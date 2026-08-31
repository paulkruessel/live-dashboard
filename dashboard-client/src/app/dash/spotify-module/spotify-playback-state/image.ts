export class Image {
    
    private url: string;

    private height: number;

    private width: number;

    public constructor(
        url: string,
        height: number,
        width: number
    ) {
        this.url = url;
        this.height = height;
        this.width = width;
    }

    public getUrl(): string {
        return this.url;
    }

    public getHeight(): number {
        return this.height;
    }

    public getWidth(): number {
        return this.width;
    }

    public setUrl(url: string) {
        this.url = url;
    }

    public setHeight(height: number) {
        this.height = height;
    }

    public setWidth(width: number) {
        this.width = width;
    }
}