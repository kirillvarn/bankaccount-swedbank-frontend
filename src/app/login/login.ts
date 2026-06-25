import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "app-login.html",
  styleUrl: "app-login.css"
})
export class Login {
  userName = '';
  error = '';

  router = inject(Router);

  login() {
    if (!this.userName.trim()) {
      this.error = 'Please enter a user name';
      return;
    }

    localStorage.setItem('userName', this.userName.trim());
    this.router.navigate(['/']);
  }
}
