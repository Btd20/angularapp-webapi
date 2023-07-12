import { Component, OnInit } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { ApiService } from '../api.service';

interface DecodedToken {
  email: string;
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string;
  // altres propietats del token
}

@Component({
  selector: 'app-admin',
  templateUrl: 'admin.component.html',
  styleUrls: ['admin.component.css']
})
export class AdminComponent implements OnInit {
  usuaris: any[] = [];
  isAdmin?: boolean;

  constructor(private apiService: ApiService) {
    const token = localStorage.getItem('token');
    const decodedToken = token ? jwt_decode(token) as DecodedToken : null;
    this.isAdmin = decodedToken?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] === 'Administrador';

    if (this.isAdmin !== undefined) {
      localStorage.setItem('isAdmin', this.isAdmin.toString());
    }
  }

  ngOnInit(): void {
    this.getUsuarisFromApi();
  }

  getUsuarisFromApi(): void {
    this.apiService.getUsuaris().subscribe(
      response => {
        this.usuaris = response;
      },
      error => {
        console.error(error);
      }
    );
  }

  editarUsuario(usuario: any): void {
    usuario.editando = true;
  }

  guardarCanvis(usuario: any): void {
    console.log('Guardar cambios del usuario:', usuario);

    usuario.editando = false;
  }

  cancelarEdicion(usuario: any): void {
    usuario.editando = false;
  }
}
