import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient) {}

  getAccounts(): Observable<any> {
    return this.http.get('http://localhost:8080/api/v1/accounts/1fe8d1c4-2ede-4bfc-9bf2-3f4a8eeba6ae');
  }
}