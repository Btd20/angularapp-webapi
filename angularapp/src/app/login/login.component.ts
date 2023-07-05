import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent {
  Username: string | undefined;
  Password: string | undefined;
  RememberMe: boolean | undefined;

  constructor(private http: HttpClient, private router: Router) { }

  login() {
    const username = encodeURIComponent(this.Username || '');
    const password = encodeURIComponent(this.Password || '');
    const rememberMe = this.RememberMe || false;

    const url = `https://localhost:7240/Auth/login`;
    const body = {
      username: username,
      password: password,
      rememberMe: rememberMe
    };

    this.http.post(url, body).subscribe(
      response => {
        // Manejar la respuesta exitosa del inicio de sesión
        console.log('Login exitoso:', response);
        window.location.href = 'https://google.es';
      },
      error => {
        console.log('Error en el inicio de sesión:', error);
      }
    );
  }
}
