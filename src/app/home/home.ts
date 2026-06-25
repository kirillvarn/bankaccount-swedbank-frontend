import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import CurrencyFormatService from '../services/currency-format.service';
import { AccountService } from '../services/account.service';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { FlashMessageService } from '../services/flash.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrl: "./home.css",
  imports: [RouterLink, CommonModule, FormsModule]
})
export class Home {
  private accountService = inject(AccountService);
  private currencyFormatterService = inject(CurrencyFormatService);
  private flash = inject(FlashMessageService);

  showNewAccountWindow = false;

  newAccount: AccountFormModel = {
    name: '',
    currency: ''
  };

  accounts = this.accountService.accountsSignal;

  primaryAccount = computed(() =>
    this.accounts().find(a => a.isPrimary) ?? null
  );

  otherAccounts = computed(() =>
    this.accounts().filter(a => !a.isPrimary)
  );

  promptNewAccount() {
    this.showNewAccountWindow = !this.showNewAccountWindow;
  }

  closeNewAccountWindow() {
    this.showNewAccountWindow = false;
  }

  createAccount() {
    this.accountService.createAccount(this.newAccount).subscribe({
      next: (created) => {
        this.accountService.addAccount(created);

        this.flash.success("Success!");
        this.closeNewAccountWindow();
      },
      error: (err) => {
        this.flash.error("Something went wrong :(");
      }
    });
  }

  ngOnInit() {
    this.accountService.loadAccounts();
  }

  getDisplayBalance(acc: AccountModel): string {
    return this.currencyFormatterService.getFormattedBalance(acc);
  }
}