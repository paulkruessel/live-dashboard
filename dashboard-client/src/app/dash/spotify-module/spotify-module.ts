import { Component, inject } from '@angular/core';
import { LoginComponent } from "./login/login";
import { SpotifyAuthService } from './auth/auth-service';
import { SpotifyService } from './spotify.service';
import { ButtonModule } from '@openng/optimus-ui/button';

@Component({
  imports: [LoginComponent, ButtonModule],
  selector: 'app-spotify-module',
  styleUrl: './spotify-module.css',
  templateUrl: './spotify-module.html',
})
export class SpotifyModule {

    auth = inject(SpotifyAuthService);
    spotify = inject(SpotifyService);

    printPlaybackState() {
      console.log(this.spotify.playbackState());
    }
}
