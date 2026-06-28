import { Routes } from '@angular/router';

export const LOGIN_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/login/login.component').then(c => c.LoginComponent),
  },
];