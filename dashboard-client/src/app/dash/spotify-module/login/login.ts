import { Component } from "@angular/core";
import { SpotifyAuthService } from "../auth/auth-service";
import { ButtonModule } from "@openng/optimus-ui/button";


@Component({
    selector: "app-login",
    standalone: true,
    templateUrl: "./login.html",
    imports: [ButtonModule]
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