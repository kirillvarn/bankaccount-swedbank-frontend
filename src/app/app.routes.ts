import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Account } from './account/account';
import { Transaction } from './transaction/transaction';

export const routes: Routes = [
    {
        path: '',
        component: Home,
        title: 'Home Page',
    },
    {
        path: 'accounts/:id',
        component: Account,
        title: 'Account Overview',
    },
    {
        path: 'transactions/:id',
        component: Transaction,
        title: 'Transaction Overview',
    }
];
