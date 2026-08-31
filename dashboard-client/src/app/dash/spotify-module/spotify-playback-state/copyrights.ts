import { CopyrightType } from "../spotify-types";

export class Copyright {
    private text: string;
    private type: CopyrightType;

    public constructor(text: string, type: CopyrightType) {
        this.text = text;
        this.type = type;
    }

    public getText(): string {
        return this.text;
    }

    public getType(): CopyrightType {
        return this.type;
    }

    public setText(text: string) {
        this.text = text;
    }

    public setType(type: CopyrightType): void {
        this.type = type;
    }
}