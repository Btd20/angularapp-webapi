import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { AuthService } from '../auth-service.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateSalesComponent } from '../create-sales/create-sales.component';
import { UpdateSalaComponent } from '../update-sala/update-sala.component';

@Component({
  selector: 'app-admin-modifyrooms',
  templateUrl: 'admin-modifyrooms.component.html',
  styleUrls: ['admin-modifyrooms.component.css']
})
export class AdminMRComponent implements OnInit {
  sales: any[] = [];
  isAdmin?: boolean;
  currentPage: number = 1;
  pageSize: number = 4;
  nomPais: string = '';
  nomCiutat: string = '';
  nomOficina: string = '';
  nomSala: string = '';

  constructor(private apiService: ApiService, private authService: AuthService, private dialog: MatDialog ) {
    this.isAdmin = authService.isAdmin;
  }

  ngOnInit(): void {
    this.getSalesFromApi();
  }

  getSalesFromApi(): void {
    this.apiService.getAllSales().subscribe(
      response => {
        this.sales = response;
      },
      error => {
        console.error(error);
      }
    );
  }

  createSales(): void {
    const dialogRef = this.dialog.open(CreateSalesComponent);


    dialogRef.afterClosed().subscribe((result: { nomPais: string, nomCiutat: string, nomOficina: string, nomSala: string } | undefined) => {
      console.log('Valores del formulario:', result);
      if (result) {
        const { nomPais, nomCiutat, nomOficina, nomSala } = result;


        if (nomPais.trim() === '' || nomCiutat.trim() === '' || nomOficina.trim() === '' ||nomSala.trim() === '') {
          alert('Els noms de la sala, de la ciutat i de l\'oficina no poden estar buits.');
          return;
        }

        const salaRepetida = this.sales.find(sala => sala.nomSala === nomSala);
        if (salaRepetida) {
          alert('Ja existeix una oficina amb aquest nom.');
          return;
        }

        console.log('Valores desestructurados:', nomPais, nomCiutat, nomOficina);
        this.apiService.createSalesByNom(nomPais, nomCiutat, nomOficina, nomSala).subscribe(

          response => {
            console.log('Sala creada: ', response);
            this.getSalesFromApi();
          },
          error => {
            console.error('Error al crear la sala: ', error);
          }
        );
      }
    });
  }

  deleteSala(sala: any): void {
    const confirmar = confirm('Estàs segur de que vols eliminar la sala?');
    if (confirmar) {
      this.apiService.deleteSalesByNom(sala.nomSala).subscribe(
        response => {
          console.log('Sala eliminada: ', response);
          this.getSalesFromApi();
        },
        error => {
          console.error('Error al eliminar la sala: ', error);
        }
      );
    }
  }

  updateSala(sala: any): void {
    console.log('Sala inicial:', JSON.stringify(sala));
    const dialogRef = this.dialog.open(UpdateSalaComponent, {
      data: { ...sala }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        console.log('Resultat:', JSON.stringify(result));

        if (result.nomSala.trim() === '') {
          alert('El nom de la sala no pot estar buit.');
          return;
        }

        const salaRepetida = this.sales.find(sala => sala.nomSala === result.nomSala && sala.meetingRoomID !== result.meetingRoomID);
        if (salaRepetida) {
          alert('Ja existeix una sala amb aquest nom.');
          return;
        }

        this.apiService.updateSala(result).subscribe(
          response => {
            console.log('Sala actualitzada:', response);
            this.getSalesFromApi();
          },
          error => {
            console.log('Quan falla: ', JSON.stringify(result));
            console.error('Error al actualizar la sala:', error);
          }
        );
      }
    });
  }

  get totalPages(): number {
    return Math.ceil(this.sales.length / this.pageSize); 
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
