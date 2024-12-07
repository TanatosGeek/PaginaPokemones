import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'',
        loadComponent: () => import('./shared/components/layout/layout.component'),
        children:[
            {
                path: 'dashboard',
                loadComponent: () => import('./business/dashboard/dashboard.component')
            },
            {
                path: 'profile',
                loadComponent: () => import('./business/profile/profile.component')
            },
            {
                path: 'pokemones',
                loadComponent: () => import('./business/tables/pokemones/pokemones.component')
            },
            {
                path: '',
                redirectTo: 'login',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: 'login',
        loadComponent: () => import('./business/authentication/login/login.component')
    },
    {
        path: 'register',
        loadComponent: () => import('./business/authentication/register/register.component')
    },
    {
        path: '**',
        redirectTo: 'login'
    }
];