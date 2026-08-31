export class ExternalUrls {

    private spotify: string;

    constructor(spotify: string) {
        this.spotify = spotify;
    }

    public getSpotify(): string {
        return this.spotify;
    }

    public setSpotify(spotify: string) {
        this.spotify = spotify;
    }
}