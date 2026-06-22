import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import CurrencyFormatService from '../services/currency-format.service';
import { Observable } from 'rxjs';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrl: "./home.css",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink]
})
export class Home {
  accounts: Account[] = [];
  primary_account?: Account;

  private accountService = inject(AccountService);
  private currencyFormatterService = inject(CurrencyFormatService);

  accounts$: Observable<Account[]> =
    this.accountService.getAccounts();

  ngOnInit() {
    this.accountService.getAccounts().subscribe((data: Account[]) => {
      console.log(data)
      this.accounts = data.filter(element => !element.isPrimary);;
      this.primary_account = data.find((element) => element.isPrimary);
    }
    );
  }

  getDisplayBalance(acc: Account): string {
    return this.currencyFormatterService.getFormattedBalance(acc);
  }

}