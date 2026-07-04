import { Routes } from '@angular/router';
import { userGuard } from './shared/guards/user.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./landing/landing.component').then(c => c.LandingComponent),
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.routes').then(r => r.HOME_ROUTES),
  },
  {
    path: 'chart',
    loadChildren: () =>
      import('./family-chart/family-chart.routes').then(r => r.FAMILY_CHART_ROUTES),
    canMatch: [userGuard],
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.routes').then(r => r.LOGIN_ROUTES),
  },
  {
    path: '**',
    redirectTo: '',
  },
];