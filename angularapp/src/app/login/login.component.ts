import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string | undefined;
  password: string | undefined;
  rememberme: boolean | undefined;

  constructor(private http: HttpClient) { }

  login() {
    const data = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      username: this.username,
      password: this.password,
      rememberme: this.rememberme
    };

    this.http.post('/Auth/login', data).subscribe(
      response => {
        // Manejar la respuesta exitosa del inicio de sesión
        console.log('Login exitoso:', response);
      },
      error => {
        // Manejar el error del inicio de sesión
      }
    );
  }
}
