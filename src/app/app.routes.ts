import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        loadComponent: () => {return import('./home/home').then(m => m.Home)}
    },
    {
        path: 'product',
        pathMatch: 'full',
        loadComponent: () => {return import('./products/products').then(m => m.Products)}
    },
    {
        path: 'cart',
        pathMatch: 'full',
        loadComponent: () => {return import('./cart/cart').then(m => m.Cart)}
    },
    {
        path: 'customer',
        pathMatch: 'full',
        loadComponent: () => {return import('./customer/customer').then(m => m.Customer)}
    }
];
