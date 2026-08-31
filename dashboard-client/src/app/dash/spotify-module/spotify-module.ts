import { Component } from '@angular/core';
import { LoginComponent } from "./login/login";

@Component({
  imports: [LoginComponent],
  selector: 'app-spotify-module',
  styleUrl: './spotify-module.css',
  templateUrl: './spotify-module.html',
})
export class SpotifyModule {}
