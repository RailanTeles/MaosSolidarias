import { Routes } from '@angular/router';
import { CampanhasComponent } from './Components/campanhas/campanhas.component';
import { LoginComponent } from './Components/login/login.component';
import { autorizadoGuard } from './_guard/autorizado.guard';
import { DoadoresComponent } from './Components/doadores/doadores.component';
import { PerfilComponent } from './Components/perfil/perfil.component';
import { RegistrarComponent } from './Components/registrar/registrar.component';

export const routes: Routes = [
  {
    path: '',
    component: CampanhasComponent,
    canActivate: [autorizadoGuard],
  },

  {
    path: 'login',
    component: LoginComponent,
  },

  {
    path: 'doadores',
    component: DoadoresComponent,
    canActivate: [autorizadoGuard]
  },

  {
    path: 'perfil',
    component: PerfilComponent,
    canActivate: [autorizadoGuard]
  },

  {
    path: 'registrar',
    component: RegistrarComponent,
  },
];
