import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth-service.service';
import jwt_decode, { JwtPayload } from 'jwt-decode';

interface DecodedToken {
  email: string;
  role: string;
  // otras propiedades que tengas en el token
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

  constructor(private authService: AuthService, private router: Router) { }

  msgLogin = '';

  showMessage() {
    this.msgLogin = "No s'ha pogut logejar. Revisa el nom d'usuari o la contrasenya.";
  }

  errorLogin() {
    const errorLogin = document.getElementById('errorLogin');
    if (errorLogin != null) {
      errorLogin.style.display = 'block';
    }
  }

  sucessLogin() {
    const succesLogin = document.getElementById('succesLogin');
    if (succesLogin != null) {
      succesLogin.style.display = 'block';
    }
  }

  login() {
    const username = encodeURIComponent(this.Username || '');
    const password = encodeURIComponent(this.Password || '');
    const rememberMe = this.RememberMe || false;

    this.authService.login(username, password).subscribe(
      response => {
        if (response?.token) {
          localStorage.setItem('token', response.token.result);
          const decodedToken = jwt_decode(response.token.result) as DecodedToken;
          console.log(decodedToken);
          console.log('Login exitoso');
          this.router.navigate(['/home']);
        } else {
          console.log('Error en el inicio de sesión: token vacío');
        }
      },
      error => {
        console.log('Error en el inicio de sesión:', error);
      }
    );
  }

  @Output() goBackEvent = new EventEmitter<void>();

  goBack() {
    this.goBackEvent.emit();
    this.router.navigate(['/']);
  }
}
