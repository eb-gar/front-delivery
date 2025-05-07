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
<<<<<<< HEAD
    path: 'users',
    loadComponent: () => import('./users/users.page').then( m => m.UsersPage)
=======
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
>>>>>>> 619349fca731e2ff975bf8ce47c5405edbae43a9
  },
];
