export class Copyright {
    private text: string;
    private type: string;

    public constructor(text: string, type: string) {
        this.text = text;
        this.type = type;
    }

    public getText(): string {
        return this.text;
    }

    public getType(): string {
        return this.type;
    }

    public setText(text: string) {
        this.text = text;
    }

    public setType(type: string) {
        this.type = type;
    }
}