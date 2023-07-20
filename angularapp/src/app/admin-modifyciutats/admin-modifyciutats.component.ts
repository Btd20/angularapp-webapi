import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { AuthService } from '../auth-service.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateCiutatComponent } from '../create-ciutat/create-ciutat.component';



@Component({
  selector: 'app-admin-modifyciutats',
  templateUrl: 'admin-modifyciutats.component.html',
  styleUrls: ['admin-modifyciutats.component.css']
})
export class AdminMCComponent implements OnInit {
  ciutats: any[] = [];
  isAdmin?: boolean;
  currentPage: number = 1;
  pageSize: number = 5;
  nomPais: string = '';
  nomCiutat: string = '';

  constructor(private apiService: ApiService, private authService: AuthService, private dialog:MatDialog) {
    this.isAdmin = authService.isAdmin;
  }

  ngOnInit(): void {
    this.getCiutatsFromApi();
  }

  getCiutatsFromApi(): void {
    this.apiService.getAllCiutats().subscribe(
      response => {
        this.ciutats = response;
      },
      error => {
        console.error(error);
      }
    );
  }

  createCiutats(): void {
    const dialogRef = this.dialog.open(CreateCiutatComponent);

    // Suscribirse al evento "afterClosed" para obtener los datos ingresados por el usuario cuando se cierre la ventana modal
    dialogRef.afterClosed().subscribe((result: { nomPais: string, nomCiutat: string } | undefined) => {
      if (result) {
        const { nomPais, nomCiutat } = result;
        this.apiService.createCiutatsByName(nomPais, nomCiutat).subscribe(
          response => {
            console.log('Ciutat creada: ', response);
            this.getCiutatsFromApi();
          },
          error => {
            console.error('Error al crear la ciutat: ', error);
          }
        );
      }
    });
  }


  updateCiutats(ciutat: any): void {
    const nouNomCiutat = prompt('Introdueix el nou nom de la ciutat', ciutat.NomCiutat);
    if (nouNomCiutat && nouNomCiutat.trim() !== '' && nouNomCiutat.trim().length > 0) {
      ciutat.NomCiutat = nouNomCiutat.trim();
      this.apiService.updateCiutats(ciutat.CityID, ciutat).subscribe(
        response => {
          console.log('Ciutat modificada: ', response);
        },
        error => {
          console.error('Error al modificar la ciutat:', error);
        }
      );
    } else {
      alert('El nom de la ciutat no pot estar en blanc');
      console.error('Nom de la ciutat invàlid');
    }
  }

  deleteCiutats(ciutat: any): void {
    const confirmar = confirm('Estás seguro de que quieres eliminar la ciudad?');
    if (confirmar) {
      this.apiService.deleteCiutatsByNom(ciutat.nomCiutat).subscribe(
        response => {
          console.log('Ciudad eliminada: ', response);
          this.getCiutatsFromApi();
        },
        error => {
          console.error('Error al eliminar la ciudad: ', error);
        }
      );
    }
  }




  get totalPages(): number {
    return Math.ceil(this.ciutats.length / this.pageSize); 
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
