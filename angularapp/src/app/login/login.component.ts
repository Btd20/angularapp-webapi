import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
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
    const data = {
      Username: this.Username,
      Password: this.Password,
      RememberMe: this.RememberMe
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    this.http.post('https://localhost:7240/Auth/login', data, { headers }).subscribe(
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
