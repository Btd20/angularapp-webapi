import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isAdmin?: boolean;
  username: string | null;
  menuOpen: boolean = false;

  constructor(private authService: AuthService) {
    this.username = sessionStorage.getItem('username');
  }

  ngOnInit(): void {
    this.username = sessionStorage.getItem('username');
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

  

}
