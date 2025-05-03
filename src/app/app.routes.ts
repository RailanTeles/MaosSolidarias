import { Routes } from '@angular/router';
import { CampanhasComponent } from './Components/campanhas/campanhas.component';
import { LoginComponent } from './Components/login/login.component';

export const routes: Routes = [

    {
        path: "",
        component: CampanhasComponent
    },

    {
        path: "login",
        component: LoginComponent
    }
];
