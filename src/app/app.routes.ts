import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'loginAdmin',
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
    path: 'loginAdmin',
    loadComponent: () => import('./Restaurants/login-admin/login-admin.page').then( m => m.LoginAdminPage)
  },
  {
    path: 'home',
    loadComponent: () => import('./Restaurants/home/home.page').then( m => m.HomePage)
  },
  {
    path: 'profile',
    loadComponent: () => import('./Restaurants/profile/profile.page').then( m => m.ProfilePage)
  },
  {
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
  {
    path: 'home-client',
    loadComponent: () => import('./Clients/home-client/home-client.page').then( m => m.HomeClientPage)
  },
  {
    path: 'cart-client',
    loadComponent: () => import('./Clients/cart-client/cart-client.page').then( m => m.CartClientPage)
  },
  {
    path: 'orders-client',
    loadComponent: () => import('./Clients/orders-client/orders-client.page').then( m => m.OrdersClientPage)
  },
  {
    path: 'register-admin',
    loadComponent: () => import('./Restaurants/register-admin/register-admin.page').then( m => m.RegisterAdminPage)
  },
  {
    path: 'order-status',
    loadComponent: () => import('./Clients/order-status/order-status.page').then( m => m.OrderStatusPage)
  },
  {
    path: 'home-motorized',
    loadComponent: () => import('./Motorized/home-motorized/home-motorized.page').then( m => m.HomeMotorizedPage)
  },
  {
    path: 'profile-motorized',
    loadComponent: () => import('./Motorized/profile-motorized/profile-motorized.page').then( m => m.ProfileMotorizedPage)
  },
  {
    path: 'history-motorized',
    loadComponent: () => import('./Motorized/historial-motorized/historial-motorized.page').then( m => m.HistorialMotorizedPage)
  },
  {
    path: 'map-motorized',
    loadComponent: () => import('./Motorized/map-motorized/map-motorized.page').then( m => m.MapMotorizedPage)
  },

];
