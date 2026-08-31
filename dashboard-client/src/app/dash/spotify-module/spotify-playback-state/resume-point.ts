export class ResumePoint {
    private fullyPlayed: boolean;
    private resumePositionMs: number;

    constructor(
        fullyPlayed: boolean,
        resumePositionMs: number
    ) {
        this.fullyPlayed = fullyPlayed;
        this.resumePositionMs = resumePositionMs;
    }

    public getFullyPlayed(): boolean {
        return this.fullyPlayed;
    }

    public getResumePositionMs(): number {
        return this.resumePositionMs;
    }

    public setFullyPlayed(fullyPlayed: boolean) {
        this.fullyPlayed = fullyPlayed;
    }

    public setResumePositionMs(resumePositionMs: number) {
        this.resumePositionMs = resumePositionMs;
    }
}