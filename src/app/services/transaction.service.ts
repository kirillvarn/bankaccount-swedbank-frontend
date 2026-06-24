import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

const BASE = "http://localhost:8080/api/v1"


@Injectable({
  providedIn: 'root',
})
export class TransactionService {
    private readonly apiUrl = `${BASE}/transactions`;

    private http = inject(HttpClient);

    getTransaction(id: string): Observable<TransactionModel> {
        return this.http.get<TransactionModel>(`${this.apiUrl}/${id}`);
    }
}