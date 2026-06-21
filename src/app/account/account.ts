import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.html',
  styleUrl: './account.css',
  imports: [RouterLink]
})
export class Account {
  id!: string | null;
  accountHolderName: string = "name";
  currency: string = "USD";
  accountNumber: string = "1";
  balance: number = 100;
  private route = inject(ActivatedRoute);

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
  }
}
