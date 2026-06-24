import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '../services/account.service';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { Table } from '../components/table/table';
import { BackButtonDirective } from '../directives/back-button.directive';
import CurrencyFormatService from '../services/currency-format.service';
import { LineChart } from '../graphics/line.chart';

@Component({
  selector: 'app-account',
  templateUrl: './account.html',
  styleUrl: './account.css',
  imports: [CommonModule, Table, BackButtonDirective, LineChart]
})
export class Account {
  accountService = inject(AccountService);
  private currencyFormatterService = inject(CurrencyFormatService);

  accountId = inject(ActivatedRoute).snapshot.paramMap.get('id')!;
  account = this.accountService.getAccount(this.accountId);

  transactions$ = this.accountService.getTransactions(this.accountId);
  transactions = toSignal(this.transactions$, { initialValue: [] });

  chartData() {
    const result = this.transactions().map(transaction => ({ date: transaction.createdAt, balance: transaction.balanceAfter }));
    return result;
  }

  getDisplayBalance(acc: AccountModel): string {
    return this.currencyFormatterService.getFormattedBalance(acc);
  }
}
