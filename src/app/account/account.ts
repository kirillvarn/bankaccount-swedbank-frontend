import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '../services/account.service';
import { CommonModule } from '@angular/common';
import { Table } from '../components/table/table';
import { BackButtonDirective } from '../directives/back-button.directive';
import CurrencyFormatService from '../services/currency-format.service';
import { LineChart } from '../graphics/line.chart';

const LIMIT = 5;

@Component({
  selector: 'app-account',
  templateUrl: './account.html',
  styleUrl: './account.css',
  imports: [CommonModule, Table, BackButtonDirective, LineChart]
})
export class Account {
  accountService = inject(AccountService);
  private currencyFormatterService = inject(CurrencyFormatService);
  private loadedPages = 0;

  accountId = inject(ActivatedRoute).snapshot.paramMap.get('id')!;
  account = this.accountService.getAccount(this.accountId);

  transactions$ = this.accountService.getTransactions(this.accountId, this.loadedPages);
  transactions = signal<TransactionModel[]>([]);

  constructor() {
    this.loadPage();
  }

  loadPage() {
    this.accountService.getTransactions(this.accountId, this.loadedPages, LIMIT)
      .subscribe(page => {
        this.transactions.update((current) => {
          return [...current, ...page];
        });
      });
  }

  loadMore() {
    this.loadedPages += 1;
    this.loadPage();
  }

  chartData() {
    const result = this.transactions().map(transaction => ({ date: transaction.createdAt, balance: transaction.balanceAfter }));
    return result;
  }

  getDisplayBalance(acc: AccountModel): string {
    return this.currencyFormatterService.getFormattedBalance(acc);
  }
}
