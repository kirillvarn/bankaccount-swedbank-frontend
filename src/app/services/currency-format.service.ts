import { Injectable } from '@angular/core';


const CURRENCY_SYMBOLS: Record<string, string> = {
    'SEK': 'kr',
    'USD': '$',
    'VND': '₫',
    'EUR': '€',
    'GBP': '£',
};

@Injectable({
    providedIn: 'root'
})
export default class CurrencyFormatService {
    getFormattedBalance(acc: AccountModel): string {
        const currencySymbol = this.get_currency(acc.currency);

        return `${currencySymbol} ${acc.balance}`;
    }

    get_currency(currencyCode: string): string {
        return CURRENCY_SYMBOLS[currencyCode];
    }
}