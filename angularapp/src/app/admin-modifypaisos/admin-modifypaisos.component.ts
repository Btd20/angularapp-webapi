import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { AuthService } from '../auth-service.service';
import { MatDialog } from '@angular/material/dialog';
import { CreatePaisComponent } from '../create-pais/create-pais.component';


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

  constructor(private apiService: ApiService, private authService: AuthService, private dialog:MatDialog) {
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
    const dialogRef = this.dialog.open(CreatePaisComponent, {
    });

    dialogRef.afterClosed().subscribe((result: string) => {
      if (result && result.trim() !== '') {
        const nouPais = { nomPais: result.trim() };
        this.apiService.createPais(nouPais).subscribe(
          response => {
            console.log('País creat: ', response);
            this.getPaisosFromApi();
          },
          error => {
            console.error('Error al crear el país: ', error);
          }
        );
      }
    });
  }


  updatePais(pais: any): void {
    const nouNomPais = prompt('Introdueix canvi', pais.nomPais);
    if (nouNomPais !== null && nouNomPais.trim() !== '' && nouNomPais.trim().length > 0) {
      pais.nomPais = nouNomPais.trim();
      this.apiService.updatePais(pais.CountryID, pais).subscribe(
        response => {
          console.log('País modificat: ', response);
        },
        error => {
          console.error('Error al modificar el país:', error);
        }
      );
    } else if (nouNomPais !== null) {
      alert('El país no pot estar en blanc');
      console.error('Nombre del país invàlid');
    }
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
