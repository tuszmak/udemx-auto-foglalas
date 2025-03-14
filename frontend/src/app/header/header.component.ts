import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [MatButtonModule, RouterLink, CommonModule, MatButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  userName = localStorage.getItem('userName');

  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('userName');
    localStorage.removeItem('password');
    this.router.navigate(['/']);
    this.userName = localStorage.getItem('userName');
  }
}
