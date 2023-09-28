import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ApiService } from '../api.service';
import { AuthService } from '../auth-service.service';
import { FormControl } from '@angular/forms';
import fuzzysearch from "fuzzysearch-ts";

@Component({
  selector: 'app-admin',
  templateUrl: 'admin.component.html',
  styleUrls: ['admin.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AdminComponent implements OnInit {
  usuaris: any[] = [];
  isAdmin?: boolean;
  currentPage: number = 1;
  pageSize: number = 3;
  userControl = new FormControl();
  filteredUsers: any[] = [];

  constructor(private apiService: ApiService, private authService: AuthService) {
    this.isAdmin = authService.isAdmin;

    this.filteredUsers = this.usuaris.slice();

    this.userControl = new FormControl(); // ¡Asegúrate de inicializar reservaControl!

    this.userControl.valueChanges.subscribe(value => {
      this.filterUsers(value);
    });
  }

  ngOnInit(): void {
    this.getUsuarisFromApi();
  }

  getUsuarisFromApi(): void {
    this.apiService.getUsuaris().subscribe(
      response => {
        this.usuaris = response;
        this.filteredUsers = this.usuaris.slice();
      },
      error => {
        console.error(error);
      }
    );
  }

  editarUsuario(usuario: any): void {
    usuario.editando = true;
  }

  eliminarUsuari(id: string): void {
    this.apiService.eliminarUsuari(id).subscribe(
      () => {
        console.log('Usuari eliminat.');
        this.getUsuarisFromApi();
      },
      (error) => {
        console.error('Error al eliminar el usuari:', error);
      }
    );
  }

  guardarCanvis(usuario: any): void {
    console.log('Guardar canvis del usuari:', usuario);

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
    this.getUsuarisFromApi();
  }

  mostrarBotonEditar(usuario: any): boolean {
    return !usuario.editando;
  }

  get totalPages(): number {
    return Math.ceil(this.usuaris.length / this.pageSize);
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

  /* filterUsers(value: string) {
     this.filteredUsers = this.usuaris.filter(usuari => usuari.userName.startsWith(value));
   }
   */

  filterUsers(value: string) {
    const trimmedValue = value.trim().toLowerCase();

    this.filteredUsers = this.usuaris.filter(usuari => {
      const trimmedUserName = usuari.userName.trim().toLowerCase();

      return fuzzysearch(trimmedValue, trimmedUserName);
    });
  }
}
