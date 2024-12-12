import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login', // Redirige a login si la ruta está vacía
        pathMatch: 'full'
    },
    {
        path: '',
        loadComponent: () =>
            import('./shared/components/layout/layout.component').then(m => m.default),
        children: [
            {
                path: 'dashboard',
                loadComponent: () =>
                    import('./business/dashboard/dashboard.component').then(m => m.default)
            },
            {
                path: 'profile',
                loadComponent: () =>
                    import('./business/profile/profile.component').then(m => m.default)
            },
            {
                path: 'pokemones',
                loadComponent: () =>
                    import('./business/tables/pokemones/pokemones.component').then(m => m.default)
            },
            {
                path: 'usuarios',
                loadComponent: () =>
                    import('./business/tables/usuarios/usuarios.component').then(m => m.default)
            }
        ]
    },
    {
        path: 'login',
        loadComponent: () =>
            import('./business/authentication/login/login.component').then(m => m.default)
    },
    {
        path: 'register',
        loadComponent: () =>
            import('./business/authentication/register/register.component').then(m => m.default)
    },
    {
        path: '**',
        redirectTo: 'login' // Redirige a login si no se encuentra la ruta
    }
];
