import { Component } from '@angular/core';
import { AuthService } from '../auth-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isAdmin?: boolean = false;
  username: string | null;

  constructor(private authService: AuthService) {
    this.username = localStorage.getItem('username');
  }

  ngOnInit(): void {
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
}
