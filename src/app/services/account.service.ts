import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

const BASE = "http://localhost:8080/api/v1"

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private readonly apiUrl = `${BASE}/accounts`;
  private accounts = signal<AccountModel[]>([]);
  readonly accountsSignal = this.accounts.asReadonly();

  private http = inject(HttpClient);

  getTransactions(accountId: string, page: number, limit: number = 10) {
    const params = new HttpParams()
      .set('page', page)
      .set('limit', limit);

    const result = this.http.get<TransactionModel[]>(`${this.apiUrl}/${accountId}/transactions`, { params });
    return result;
  }

  loadAccounts() {
    this.http.get<AccountModel[]>(this.apiUrl)
      .subscribe(accounts => this.accounts.set(accounts));
  }

  addAccount(account: AccountModel) {
    this.accounts.update(accounts => [...accounts, account]);
  }


  getAccount(id: string) {
    const remote = signal<AccountModel | null>(null);

    if (this.accounts().length == 0) {
      this.http.get<AccountModel>(`${this.apiUrl}/${id}`).pipe(
        tap(acc => remote.set(acc))
      ).subscribe();

      return remote;
    }

    return computed(() => this.accounts().find(a => a.id === id) ?? null);
  }

  createAccount(account: AccountFormModel): Observable<AccountModel> {
    return this.http.post<AccountModel>(this.apiUrl, account);
  }
}