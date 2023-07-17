import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  username: string | null = localStorage.getItem('username');
  role: string | null = localStorage.getItem('role');
  email: string | null = localStorage.getItem('email');
}
