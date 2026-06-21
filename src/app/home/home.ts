import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrl: "./home.css",
  imports: [RouterLink]
})
export class Home {
  accounts: any;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getAccounts().subscribe(data => {
      console.log(data);
      this.accounts = data;
    });
  }
}