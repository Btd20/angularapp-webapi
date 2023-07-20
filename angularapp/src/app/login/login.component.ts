import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth-service.service';
import jwt_decode, { JwtPayload } from 'jwt-decode';

interface DecodedToken {
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
          localStorage.setItem('token', response.token.result);
          const decodedToken = jwt_decode(response.token.result) as DecodedToken;
          this.authService.isAdmin = decodedToken?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] === 'Administrador';
          localStorage.setItem('username', username);
          console.log(decodedToken);
          console.log('Login exitoso');
          this.router.navigate(['/home']);
        } else {
          console.log('Error en el inici de sessió, token buit.');
        }
      },
      error => {
        console.log('Error en iniciar sessió:', error);
        //AQUI S'HA DE ACTIVAR EL DIV DE ALERT-BOOTSTRAP
      }
    );
  }

  @Output() goBackEvent = new EventEmitter<void>();

  goBack() {
    this.goBackEvent.emit();
    this.router.navigate(['/']);
  }
}
