import {
    Component,
    OnInit
} from "@angular/core";
import { SpotifyAuthService } from "../auth/auth-service";



@Component({
    selector: "app-spotify-callback",
    standalone: true,
    template: `
        <p>Spotify-Anmeldung wird abgeschlossen...</p>
    `
})
export class SpotifyCallbackComponent
    implements OnInit {

    constructor(
        private readonly spotifyAuthService:
            SpotifyAuthService
    ) {}


    public ngOnInit(): void {

        this.spotifyAuthService.handleCallback(
            "/"
        );
    }
}