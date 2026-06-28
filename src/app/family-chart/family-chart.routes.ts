import { Routes } from '@angular/router';

export const FAMILY_CHART_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/chart/chart.component').then(c => c.ChartComponent),
  },
];