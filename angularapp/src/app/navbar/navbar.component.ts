import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isAdmin?: boolean;
  username: string | null;
  menuOpen: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
    this.username = localStorage.getItem('username');
  }

  ngOnInit(): void {
    this.username = localStorage.getItem('username');
    this.isAdmin = this.authService.isAdmin;
  }

  dropMenu() {
    const dropbox = document.getElementById('dmenu');
    if (dropbox != null) {
      dropbox.style.display = 'block';
    }
  }

  notDropMenu() {
    const dropbox = document.getElementById('dmenu');
    if (dropbox != null) {
      dropbox.style.display = 'none';
    }
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
}
