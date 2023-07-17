import { Component } from '@angular/core';
import { AuthService } from '../auth-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isAdmin?: boolean;

  constructor(private authService: AuthService) {
    this.isAdmin = authService.isAdmin;
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
