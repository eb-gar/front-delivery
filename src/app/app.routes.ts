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
    path: 'users-form',
    loadComponent: () => import('./pages/users-form/users-form.page').then( m => m.UsersFormPage)
  },
  {
    path: 'motorcyclists-form',
    loadComponent: () => import('./pages/motorcyclists-form/motorcyclists-form.page').then( m => m.MotorcyclistsFormPage)
  },
  {
    path: 'restaurants-form',
    loadComponent: () => import('./pages/restaurants-form/restaurants-form.page').then( m => m.RestaurantsFormPage)
  },
];
