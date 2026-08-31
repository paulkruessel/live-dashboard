import { Routes } from "@angular/router";

import { Dash } from "./dash/dash";

import {
    SpotifyCallbackComponent
} from "./dash/spotify-module/callback/callback";

export const routes: Routes = [

    {
        path: "",
        component: Dash
    },

    {
        path: "callback",
        component: SpotifyCallbackComponent
    },

    {
        path: "**",
        redirectTo: ""
    }

];