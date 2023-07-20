import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  username: string | null = sessionStorage.getItem('username');
  role: string | null = sessionStorage.getItem('role');
  email: string | null = sessionStorage.getItem('email');
  pais: string | null = sessionStorage.getItem('pais');
  oficina: string | null = sessionStorage.getItem('oficina');
}
