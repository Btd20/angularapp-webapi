import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { AuthService } from '../auth-service.service';

@Component({
  selector: 'app-admin-modifyoficines',
  templateUrl: 'admin-modifyoficines.component.html',
  styleUrls: ['admin-modifyoficines.component.css']
})
export class AdminMOComponent implements OnInit {
  usuaris: any[] = [];
  isAdmin?: boolean;
  currentPage: number = 1;
  pageSize: number = 5;

  constructor(private apiService: ApiService, private authService: AuthService) {
    this.isAdmin = authService.isAdmin;
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
    console.log('Guardar canvis del usuari:', usuario);

    // Realizar una solicitud HTTP a la API para actualizar los cambios en la base de datos
    this.apiService.actualitzarUsuari(usuario).subscribe(
      response => {
        console.log('Canvis guardats');
        usuario.editando = false;
      },
      error => {
        console.error('Error al guardar els canvis:', error);
      }
    );
  }

  cancelarEdicion(usuario: any): void {
    usuario.editando = false;
  }

  mostrarBotonEditar(usuario: any): boolean {
    return !usuario.editando;
  }

  get totalPages(): number {
    return Math.ceil(this.usuaris.length / this.pageSize); // Total de páginas
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
}
