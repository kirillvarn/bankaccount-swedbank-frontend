import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
  imports: [RouterLink]
})
export class Sidebar {
  router = inject(Router);
  authService = inject(AuthService);

  logout() {
    localStorage.removeItem('userName');
    this.authService.clearCache();
    this.router.navigate(['/login']);
  }
}