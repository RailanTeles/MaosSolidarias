import { Routes } from '@angular/router';
import { CampanhasComponent } from './Components/campanhas/campanhas.component';
import { LoginComponent } from './Components/login/login.component';
import { autorizadoGuard } from './_guard/autorizado.guard';

export const routes: Routes = [

    {
        path: "",
        component: CampanhasComponent,
        // canActivate: [autorizadoGuard]
    },

    {
        path: "login",
        component: LoginComponent
    }
];
