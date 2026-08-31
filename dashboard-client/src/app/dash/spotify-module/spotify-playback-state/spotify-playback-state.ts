import { Actions } from "./actions";
import { Context } from "./context";
import { Device } from "./device";
import { EpisodeObject } from "./episode-object";
import { TrackObject } from "./track-object";

export class SpotifyPlaybackState {

    private device: Device;
    private repeatState: "track" | "context" | "off";
    private shuffleState: boolean;
    private context: Context | null;
    private timestamp: number;
    private progressMs: number | null;
    private isPlaying: boolean;
    private item: TrackObject | EpisodeObject | null;
    private actions: Actions;

    constructor(
        device: Device,
        repeatState: "track" | "context" | "off",
        shuffleState: boolean,
        context: Context | null,
        timestamp: number,
        progressMs: number | null,
        isPlaying: boolean,
        item: TrackObject | EpisodeObject | null,
        actions: Actions
    ) {
        this.device = device;
        this.repeatState = repeatState;
        this.shuffleState = shuffleState;
        this.context = context;
        this.timestamp = timestamp;
        this.progressMs = progressMs;
        this.isPlaying = isPlaying;
        this.item = item;
        this.actions = actions;
    }

    public getDevice(): Device {
        return this.device;
    }

    public setDevice(device: Device): void {
        this.device = device;
    }

    public getRepeatState(): "track" | "context" | "off" {
        return this.repeatState;
    }

    public setRepeatState(repeatState: "track" | "context" | "off"): void {
        this.repeatState = repeatState;
    }

    public getShuffleState(): boolean {
        return this.shuffleState;
    }

    public setShuffleState(shuffleState: boolean): void {
        this.shuffleState = shuffleState;
    }

    public getContext(): Context | null {
        return this.context;
    }

    public setContext(context: Context | null): void {
        this.context = context;
    }

    public getTimestamp(): number {
        return this.timestamp;
    }

    public setTimestamp(timestamp: number): void {
        this.timestamp = timestamp;
    }

    public getProgressMs(): number | null {
        return this.progressMs;
    }

    public setProgressMs(progressMs: number | null): void {
        this.progressMs = progressMs;
    }

    public getIsPlaying(): boolean {
        return this.isPlaying;
    }

    public setIsPlaying(isPlaying: boolean): void {
        this.isPlaying = isPlaying;
    }

    public getItem(): TrackObject | EpisodeObject | null {
        return this.item;
    }

    public setItem(item: TrackObject | EpisodeObject | null): void {
        this.item = item;
    }

    public getActions(): Actions {
        return this.actions;
    }

    public setActions(actions: Actions): void {
        this.actions = actions;
    }
}