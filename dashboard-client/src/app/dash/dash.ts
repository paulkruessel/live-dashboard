import { Component } from '@angular/core';
import { TimeModule } from "./time-module/time-module";
import { Card } from "@openng/optimus-ui/card";
import { SpotifyModule } from "./spotify-module/spotify-module";

@Component({
  imports: [TimeModule, Card, SpotifyModule],
  selector: 'app-dash',
  styleUrl: './dash.css',
  templateUrl: './dash.html',
})
export class Dash {}
