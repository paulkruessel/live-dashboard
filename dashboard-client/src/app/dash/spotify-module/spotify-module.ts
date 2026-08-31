import { Component, inject } from '@angular/core';
import { LoginComponent } from "./login/login";
import { SpotifyAuthService } from './auth/auth-service';

@Component({
  imports: [LoginComponent],
  selector: 'app-spotify-module',
  styleUrl: './spotify-module.css',
  templateUrl: './spotify-module.html',
})
export class SpotifyModule {

    auth = inject(SpotifyAuthService);

}
