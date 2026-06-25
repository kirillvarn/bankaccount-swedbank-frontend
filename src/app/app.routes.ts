import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Account } from './account/account';
import { Transaction } from './transaction/transaction';
import { authGuard } from './guards/auth.guard';
import { Login } from './login/login';

export const routes: Routes = [
    { path: 'login', component: Login, title: 'Login' },
    {
        path: '',
        component: Home,
        title: 'Home Page',
        canActivate: [authGuard]
    },
    {
        path: 'accounts/:id',
        component: Account,
        title: 'Account Overview',
        canActivate: [authGuard]
    },
    {
        path: 'transactions/:id',
        component: Transaction,
        title: 'Transaction Overview',
        canActivate: [authGuard]
    }
];
