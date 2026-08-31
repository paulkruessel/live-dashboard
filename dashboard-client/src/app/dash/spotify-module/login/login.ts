import { Component } from "@angular/core";
import { SpotifyAuthService } from "../auth/auth-service";


@Component({
    selector: "app-login",
    standalone: true,

    template: `
        @if (!auth.isAuthenticated()) {

            <button (click)="login()">
                Mit Spotify anmelden
            </button>

        } @else {

            <p>
                Mit Spotify verbunden
            </p>

            <button (click)="logout()">
                Abmelden
            </button>

        }

        @if (auth.error()) {

            <p>
                {{ auth.error() }}
            </p>

        }
    `
})
export class LoginComponent {

    constructor(
        public readonly auth:
            SpotifyAuthService
    ) {}


    public login(): void {

        this.auth.login();
    }


    public logout(): void {

        this.auth.logout();
    }
}