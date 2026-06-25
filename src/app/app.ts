import { Component, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Sidebar } from './sidebar/sidebar';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';
import { Flash } from './flash/flash';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Sidebar, Flash, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('swed-frontend');

  showSidebar = true;

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.showSidebar = this.router.url !== '/login';
      });
  }
}
