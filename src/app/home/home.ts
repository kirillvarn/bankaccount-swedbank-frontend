import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import CurrencyFormatService from '../services/currency-format.service';
import { AccountService } from '../services/account.service';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrl: "./home.css",
  imports: [RouterLink, CommonModule]
})
export class Home {
  private accountService = inject(AccountService);
  private currencyFormatterService = inject(CurrencyFormatService);

  accounts$ = this.accountService.getAccounts();

  accounts = toSignal(this.accounts$, { initialValue: [] as AccountModel[] });

  primaryAccount = computed(() =>
    this.accounts().find(a => a.isPrimary) ?? null
  );

  otherAccounts = computed(() =>
    this.accounts().filter(a => !a.isPrimary)
  );

  ngOnInit() {
    this.accounts$.subscribe(list => this.accountService.setAccounts(list));
  }

  getDisplayBalance(acc: AccountModel): string {
    return this.currencyFormatterService.getFormattedBalance(acc);
  }
}