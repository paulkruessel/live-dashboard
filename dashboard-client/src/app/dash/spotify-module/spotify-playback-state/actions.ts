export class Actions {

    private interruptingPlayback: boolean;
    private pausing: boolean;
    private resuming: boolean;
    private seeking: boolean;
    private skippingNext: boolean;
    private skippingPrev: boolean;
    private togglingRepeatContext: boolean;
    private togglingShuffle: boolean;
    private togglingRepeatTrack: boolean;
    private transferringPlayback: boolean;

    constructor(
        interruptingPlayback: boolean,
        pausing: boolean,
        resuming: boolean,
        seeking: boolean,
        skippingNext: boolean,
        skippingPrev: boolean,
        togglingRepeatContext: boolean,
        togglingShuffle: boolean,
        togglingRepeatTrack: boolean,
        transferringPlayback: boolean
    ) {
        this.interruptingPlayback = interruptingPlayback;
        this.pausing = pausing;
        this.resuming = resuming;
        this.seeking = seeking;
        this.skippingNext = skippingNext;
        this.skippingPrev = skippingPrev;
        this.togglingRepeatContext = togglingRepeatContext;
        this.togglingShuffle = togglingShuffle;
        this.togglingRepeatTrack = togglingRepeatTrack;
        this.transferringPlayback = transferringPlayback;
    }

    public getInterruptingPlayback(): boolean {
        return this.interruptingPlayback;
    }

    public setInterruptingPlayback(interruptingPlayback: boolean): void {
        this.interruptingPlayback = interruptingPlayback;
    }

    public getPausing(): boolean {
        return this.pausing;
    }

    public setPausing(pausing: boolean): void {
        this.pausing = pausing;
    }

    public getResuming(): boolean {
        return this.resuming;
    }

    public setResuming(resuming: boolean): void {
        this.resuming = resuming;
    }

    public getSeeking(): boolean {
        return this.seeking;
    }

    public setSeeking(seeking: boolean): void {
        this.seeking = seeking;
    }

    public getSkippingNext(): boolean {
        return this.skippingNext;
    }

    public setSkippingNext(skippingNext: boolean): void {
        this.skippingNext = skippingNext;
    }

    public getSkippingPrev(): boolean {
        return this.skippingPrev;
    }

    public setSkippingPrev(skippingPrev: boolean): void {
        this.skippingPrev = skippingPrev;
    }

    public getTogglingRepeatContext(): boolean {
        return this.togglingRepeatContext;
    }

    public setTogglingRepeatContext(togglingRepeatContext: boolean): void {
        this.togglingRepeatContext = togglingRepeatContext;
    }

    public getTogglingShuffle(): boolean {
        return this.togglingShuffle;
    }

    public setTogglingShuffle(togglingShuffle: boolean): void {
        this.togglingShuffle = togglingShuffle;
    }

    public getTogglingRepeatTrack(): boolean {
        return this.togglingRepeatTrack;
    }

    public setTogglingRepeatTrack(togglingRepeatTrack: boolean): void {
        this.togglingRepeatTrack = togglingRepeatTrack;
    }

    public getTransferringPlayback(): boolean {
        return this.transferringPlayback;
    }

    public setTransferringPlayback(transferringPlayback: boolean): void {
        this.transferringPlayback = transferringPlayback;
    }
}