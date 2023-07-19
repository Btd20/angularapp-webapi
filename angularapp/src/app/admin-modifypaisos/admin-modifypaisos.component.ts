import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { AuthService } from '../auth-service.service';

@Component({
  selector: 'app-admin-modifypaisos',
  templateUrl: 'admin-modifypaisos.component.html',
  styleUrls: ['admin-modifypaisos.component.css']
})
export class AdminMPComponent implements OnInit {
  isAdmin?: boolean;
  currentPage: number = 1;
  pageSize: number = 6;
  paisos: any[] = [];

  constructor(private apiService: ApiService, private authService: AuthService) {
    this.isAdmin = authService.isAdmin;
  }

  ngOnInit(): void {
    this.getPaisosFromApi();
  }

  getPaisosFromApi(): void {
    this.apiService.getPaisos().subscribe(
      response => {
        this.paisos = response;
      },
      error => {
        console.error(error);
      }
    );
  }

  createPais(): void {
    const nomPais = prompt('Introdueix el nom del país');
    if (nomPais && nomPais.trim() !== '' && nomPais.trim().length > 0) {
      const nouPais = { nomPais: nomPais.trim() };
      this.apiService.createPais(nouPais).subscribe(
        response => {
          console.log('País creat: ', response);
          this.getPaisosFromApi();
        },
        error => {
          console.error('Error al crear el país: ', error);
        }
      );
    } else {
      console.error('Nom del país invàlid');
      alert('El país no pot estar en blanc');
    }
  }


  updatePais(pais: any): void {
    this.apiService.updatePais(pais.CountryID, pais).subscribe(
      response => {
        console.log('País modificado: ', response);
      },
      error => {
        console.error('Error al modificar el país :', error);
      }
    );
  }

  deletePais(pais: any): void {
    if (confirm('Estás seguro de que quieres eliminar este país?')) {
      this.apiService.deletePaisByNom(pais.nomPais).subscribe(
        response => {
          console.log('País eliminat: ', response);
          this.getPaisosFromApi();
        },
        error => {
          console.error('Error al eliminar el país:', error);
        }
      );
    }
  }

  get totalPages(): number {
    return Math.ceil(this.paisos.length / this.pageSize);
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
