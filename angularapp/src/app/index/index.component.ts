import { Component } from '@angular/core';
import { AuthService } from '../auth-service.service';
import jwt_decode, { JwtPayload } from 'jwt-decode';
import { Router } from '@angular/router';

interface DecodedToken {
  exp: number;
  username: string;
  email: string;
  role: string;
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string;
  // otras propiedades que tengas en el token
}

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    const token = localStorage.getItem('token');

    if (token) {
      const decodedToken = jwt_decode(token) as DecodedToken;
      const expirationTime = new Date(decodedToken.exp * 1000);

      if (expirationTime > new Date()) {
        // El token es válido, puedes establecer la sesión.
        this.authService.isAdmin = decodedToken?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] === 'Administrador';
        //localStorage.setItem('username', decodedToken.username);
        this.router.navigate(['/home']);
      } else {
        // El token ha expirado, puedes realizar alguna acción (por ejemplo, cerrar la sesión).
        localStorage.removeItem('token');
        localStorage.removeItem('username');
      }
    }
  }

}
