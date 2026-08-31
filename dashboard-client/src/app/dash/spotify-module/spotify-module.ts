import { Component, inject } from '@angular/core';
import { LoginComponent } from "./login/login";
import { SpotifyAuthService } from './auth/auth-service';
import { SpotifyService } from './spotify.service';
import { ButtonModule } from '@openng/optimus-ui/button';
import { SpotifyPlayer } from "./spotify-player/spotify-player";

@Component({
  imports: [LoginComponent, ButtonModule, SpotifyPlayer],
  selector: 'app-spotify-module',
  styleUrl: './spotify-module.css',
  templateUrl: './spotify-module.html',
})
export class SpotifyModule {

    auth = inject(SpotifyAuthService);
    spotify = inject(SpotifyService);

    playbackState = this.spotify.playbackState;

    songProgressMs = this.spotify.localProgressMs;
}
