import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard.page').then(m => m.DashboardPage)
  },
  {
    path: 'tareas',
    loadComponent: () => import('./pages/tareas/tareas.page').then(m => m.TareasPage)
  },
  {
    path: 'habitos',
    loadComponent: () => import('./pages/habitos/habitos.page').then(m => m.HabitosPage)
  }
];
