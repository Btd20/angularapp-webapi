import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

interface DecodedToken {
  email: string;
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string;
  // otras propiedades del token
}

@Injectable({
  providedIn: 'root'
})

export class AuthService implements OnInit {
  isAdmin?: boolean = false;
  constructor(private http: HttpClient, private router: Router) {
    const token = localStorage.getItem('token');
    const decodedToken = token ? jwt_decode(token) as DecodedToken : null;
    this.isAdmin = decodedToken?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] === 'Administrador';
    let role = decodedToken?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

    if (role === "Administrador") {
      role = "Administrador";
    } else {
      role = "Usuari";
    }

    localStorage.setItem('role', role);

    if (this.isAdmin !== undefined) {
      localStorage.setItem('isAdmin', this.isAdmin.toString());
    }
  }

  ngOnInit(): void {

  }

  login(username: string, password: string): Observable<any> {
    const body = {
      Username: username,
      Password: password
    };

    return this.http.post<any>('https://localhost:7240/Auth/login', body);
  }

  changePassword(currentPassword: string, newPassword: string) {

    const body = {
      username: localStorage.getItem('username'),
      currentPassword: currentPassword,
      newPassword: newPassword
    };

    return this.http.post<any>('https://localhost:7240/api/ApplicationUsers/ChangePassword', body);
  }

  changeUsername(currentUsername: string, newUsername: string) {

    const body = {
      username: localStorage.getItem('username'),
      currentUsername: currentUsername,
      newUsername: newUsername
    };

    return this.http.post<any>('https://localhost:7240/api/ApplicationUsers/ChangeUsername', body);
  }

  changeEmail(currentEmail: string, newEmail: string) {

    const body = {
      email: localStorage.getItem('email'),
      currentEmail: currentEmail,
      newEmail: newEmail
    };

    return this.http.post<any>('https://localhost:7240/api/ApplicationUsers/ChangeEmail', body);
  }
}
