import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./Super-Admin/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./Super-Admin/register/register.page').then( m => m.RegisterPage)
  },
  {
    path: 'form',
    loadComponent: () => import('./Super-Admin/form/form.page').then( m => m.FormPage)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./Super-Admin/dashboard/dashboard.page').then( m => m.DashboardPage)
  },
];
