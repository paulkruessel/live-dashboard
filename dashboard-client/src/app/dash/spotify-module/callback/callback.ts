import {
    Component,
    OnInit
} from "@angular/core";

import {
    SpotifyAuthService
} from "../auth/auth-service";

@Component({
    selector: "app-spotify-callback",
    standalone: true,

    template: `
        @if (auth.error()) {

            <h2>Spotify-Anmeldung fehlgeschlagen</h2>

            <p>
                {{ auth.error() }}
            </p>

        } @else {

            <p>
                Spotify-Anmeldung wird abgeschlossen...
            </p>
        }
    `
})
export class SpotifyCallbackComponent implements OnInit {

    constructor(
        public readonly auth:
            SpotifyAuthService
    ) {}

    public ngOnInit(): void {

        this.auth.handleCallback("/");
    }
}