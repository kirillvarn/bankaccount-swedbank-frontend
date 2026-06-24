import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AccountService } from '../services/account.service';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { Table } from '../components/table/table';
import { BackButtonDirective } from '../directives/back-button.directive';

@Component({
  selector: 'app-account',
  templateUrl: './account.html',
  styleUrl: './account.css',
  imports: [RouterLink, CommonModule, Table, BackButtonDirective]
})
export class Account {
  accountService = inject(AccountService);

  accountId = inject(ActivatedRoute).snapshot.paramMap.get('id')!;
  account = this.accountService.getAccount(this.accountId);

  transactions$ = this.accountService.getTransactions(this.accountId);
  transactions = toSignal(this.transactions$, { initialValue: [] });
}
