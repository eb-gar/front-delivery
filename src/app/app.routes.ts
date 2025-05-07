import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },

  {
    path: 'users',
    loadComponent: () => import('./pages/users/users-form.page').then( m => m.UsersFormPage)
  },

  {
    path: 'motorcyclists',
    loadComponent: () => import('./pages/motorcyclists/motorcyclists-form.page').then( m => m.MotorcyclistsFormPage)
  },

  {
    path: 'restaurants',
    loadComponent: () => import('./pages/restaurants/restaurants-form.page').then( m => m.RestaurantsFormPage)
  },
];
