import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { Card } from "@openng/optimus-ui/card";
import { ButtonModule } from "@openng/optimus-ui/button";
import { SpotifyPlaybackState } from '../spotify-playback-state/spotify-playback-state';
import { TrackObject } from '../spotify-playback-state/track-object';
import { EpisodeObject } from '../spotify-playback-state/episode-object';
import { Image } from '../spotify-playback-state/image';
import { SliderChangeEvent, SliderModule } from '@openng/optimus-ui/slider';
import { FormsModule } from '@angular/forms';
import { SpotifyService } from '../spotify.service';

@Component({
    imports: [Card, ButtonModule, SliderModule, FormsModule],
    selector: 'app-spotify-player',
    styleUrl: './spotify-player.css',
    templateUrl: './spotify-player.html',
})
export class SpotifyPlayer {

    value = signal(0);

    spotify = inject(SpotifyService);

    playbackState = this.spotify.playbackState;
    songProgressMs = this.spotify.localProgressMs;

    songCover = computed<Image | null>(() => {
        const playbackState = this.playbackState();
        if (!playbackState) {
            return null;
        }

        if (!playbackState.getItem()) {
            return null;
        }

        if (playbackState.getItem()?.getType() === "track") {
            const track: TrackObject = playbackState.getItem() as TrackObject;

            if (!track.getAlbum()) {
                return null;
            }

            if (!track.getAlbum().getImages()) {
                return null;
            }

            const image: Image = track.getAlbum().getImages()[0];

            return new Image(
                image.getUrl(),
                image.getHeight(),
                image.getWidth()
            );
        } else {
            const episode: EpisodeObject = playbackState.getItem() as EpisodeObject;

            if (!episode.getShow()) {
                return null;
            }

            if (!episode.getShow().getImages()) {
                return null;
            }

            const image: Image = episode.getShow().getImages()[0];

            return new Image(
                image.getUrl(),
                image.getHeight(),
                image.getWidth()
            );
        }
    })

    songTitle = computed<string>(() => {
        const playbackState = this.playbackState();
        if (!playbackState) {
            return "Title not available"
        }

        return playbackState.getItem()?.getName() ?? "Title not available";
    })

    songArtist = computed<string>(() => {
        
        const playbackState = this.playbackState();
        if (!playbackState) {
            return "Artist not available"
        }
        
        if (!playbackState.getItem()) {
            return "Artist not available"
        }

        if (playbackState.getItem()?.getType() === "track") {
            const track: TrackObject = playbackState.getItem() as TrackObject;

            if (!track.getArtists()) {
                return "Artist not available"
            }

            const numArtists = track.getArtists().length;
            let artists = "";
            for (let index = 0; index < numArtists; index++) {
                const artist = track.getArtists()[index].getName();
                artists += artist;
                if (index < numArtists - 1) {
                    artists += ", "
                }
            }

            return artists;
        } else {
            const episode: EpisodeObject = playbackState.getItem() as EpisodeObject;

            return episode.getShow().getPublisher();
        }
    });

    
    isPlaying = computed<boolean>(() => {
        const playbackState = this.playbackState();
        if(!playbackState) return false;
        return playbackState.getIsPlaying();
    });
    
    songLengthMs = computed<number>(() => {
        const playbackState = this.playbackState();

        return playbackState?.getItem()?.getDurationMs() ?? 0;
    });


    constructor() {
        effect(() => {
            this.value.set(
                this.songProgressMs()
            );
        });
    }

    private formatMilliseconds(ms: number): string {
        const totalSeconds = Math.floor(ms / 1000);

        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;

        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    }

    pausePlay() {
        if (this.isPlaying()) {
            this.spotify.pausePlayback();
        } else {
            this.spotify.startPlayback();
        }
    }

    skipSong() {
        this.spotify.skipSong();
    }

    previousSong() {
        if (this.songProgressMs() <= 1000) {
            this.spotify.prevSong();
        } else {
            this.spotify.seekPos(0);
        }
    }
}
