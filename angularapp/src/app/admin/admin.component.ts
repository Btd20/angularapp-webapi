import { Component } from '@angular/core';
import jwt_decode from 'jwt-decode';

interface DecodedToken {
  email: string;
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string;
  // otras propiedades que tengas en el token
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  isAdmin?: boolean;

  constructor() {
    const token = localStorage.getItem('token');
    const decodedToken = token ? jwt_decode(token) as DecodedToken : null;
    this.isAdmin = decodedToken?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] === 'Administrador';

    // Guardar el valor del booleano en localStorage
    if (this.isAdmin !== undefined) {
      localStorage.setItem('isAdmin', this.isAdmin.toString());
    }
  }
}
