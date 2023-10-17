import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth-service.service';
import jwt_decode, { JwtPayload } from 'jwt-decode';

interface DecodedToken {
  exp: number;
  username: string;
  email: string;
  role: string;
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string;
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

  login() {
    const username = encodeURIComponent(this.Username || '');
    const password = encodeURIComponent(this.Password || '');
    const rememberMe = this.RememberMe || false;

    this.authService.login(username, password).subscribe(
      response => {
        if (response?.token) {
          const decodedToken = jwt_decode(response.token.result) as DecodedToken;
          const expirationTime = new Date(decodedToken.exp * 1000); // Convertir a milisegundos

          if (expirationTime > new Date()) {
            localStorage.setItem('token', response.token.result);
            this.authService.isAdmin = decodedToken?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] === 'Administrador';
            localStorage.setItem('username', username);
            console.log(decodedToken);
            console.log('Login exitoso');
            this.router.navigate(['/home']);
          } else {
            console.log('El token ha expirado');
          }
        } else {
          console.log('Error en el inicio de sesión, token vacío.');
        }
      },
      error => {
        console.log('Error en iniciar sesión:', error);
        //AQUÍ SE DEBE ACTIVAR EL DIV DE ALERT-BOOTSTRAP
      }
    );
  }

  @Output() goBackEvent = new EventEmitter<void>();

  goBack() {
    this.goBackEvent.emit();
    this.router.navigate(['/']);
  }
}
