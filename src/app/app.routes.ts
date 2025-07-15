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
  {
    path: 'login-admin',
    loadComponent: () => import('./Restaurants/login-admin/login-admin.page').then( m => m.LoginAdminPage)
  },
  {
    path: 'home',
    loadComponent: () => import('./Restaurants/home/home.page').then( m => m.HomePage)
  },
  {
    path: 'profile',
    loadComponent: () => import('./Restaurants/profile/profile.page').then( m => m.ProfilePage)
  },  {
    path: 'menu',
    loadComponent: () => import('./Restaurants/menu/menu.page').then( m => m.MenuPage)
  },
  {
    path: 'menu-form',
    loadComponent: () => import('./Restaurants/menu-form/menu-form.page').then( m => m.MenuFormPage)
  },
  {
    path: 'orders',
    loadComponent: () => import('./Restaurants/orders/orders.page').then( m => m.OrdersPage)
  },

];
