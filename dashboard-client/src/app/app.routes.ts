import { Routes } from "@angular/router";
import { SpotifyCallbackComponent } from "./dash/spotify-module/callback/callback";


export const routes: Routes = [

    {
        path: "callback",
        component: SpotifyCallbackComponent
    }

];