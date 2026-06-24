import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

const BASE = "http://localhost:8080/api/v1"

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private readonly apiUrl = `${BASE}/accounts`;
  private accounts = signal<AccountModel[]>([]);

  private http = inject(HttpClient);

  getTransactions(accountId: string) {
    const result = this.http.get<any[]>(`${this.apiUrl}/${accountId}/transactions`);
    return result;
  }

  setAccounts(list: AccountModel[]) {
    this.accounts.set(list);
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

  getAccounts(): Observable<AccountModel[]> {
    return this.http.get<AccountModel[]>(this.apiUrl);
  }
}