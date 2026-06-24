import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";

const BASE = "http://localhost:8080/api/v1"


@Injectable({
  providedIn: 'root',
})
export class TransactionService {
    private readonly apiUrl = `${BASE}/transactions`;

    private http = inject(HttpClient);

    getTransaction(id: string) {
        return this.http.get<any>(`${this.apiUrl}/${id}`);
    }
}