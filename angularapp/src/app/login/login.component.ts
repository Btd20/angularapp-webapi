import { Component, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

interface LoginResponse {
  token: string;
}

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent {
  Username: string | undefined;
  Password: string | undefined;
  RememberMe: boolean | undefined;

  @Output() loggedInEvent = new EventEmitter<boolean>();
  constructor(private http: HttpClient, private router: Router) { }

  msgLogin = '';

  showMessage() {
    this.msgLogin = "No se ha podido iniciar sesión. Verifica el nombre de usuario o la contraseña.";
  }

  login() {
    const url = `https://localhost:7240/Auth/login`;
    const body = {
      Username: this.Username,
      Password: this.Password,
      RememberMe: this.RememberMe
    };

    this.http.post<LoginResponse>(url, body).subscribe(
      response => {
        console.log('Login exitoso:', response);
        /* Emmagatzemar token en local */
        localStorage.setItem('token', response.token);
        this.loggedInEvent.emit(true);
      },
      error => {
        console.log('Error en el inicio de sesión:', error);
      }
    );
  }

  @Output() goBackEvent = new EventEmitter<void>();

  goBack() {
    this.goBackEvent.emit();
  }
}
