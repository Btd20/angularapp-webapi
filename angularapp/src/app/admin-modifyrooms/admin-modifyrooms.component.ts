import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { AuthService } from '../auth-service.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateSalesComponent } from '../create-sales/create-sales.component';
import { UpdateSalaComponent } from '../update-sala/update-sala.component';
import { FormControl } from '@angular/forms';
import fuzzysearch from "fuzzysearch-ts";
import { SalesService } from '../sales.service';

@Component({
  selector: 'app-admin-modifyrooms',
  templateUrl: 'admin-modifyrooms.component.html',
  styleUrls: ['admin-modifyrooms.component.css']
})
export class AdminMRComponent implements OnInit {
  sales: any[] = [];
  isAdmin?: boolean;
  currentPage: number = 1;
  pageSize: number = 3;
  nomPais: string = '';
  nomCiutat: string = '';
  nomOficina: string = '';
  nomSala: string = '';
  salesControl = new FormControl();
  filteredSales: any[] = [];

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private dialog: MatDialog,
    private salesService: SalesService
  ) {
    this.isAdmin = authService.isAdmin;
    this.filteredSales = this.sales.slice();

    this.salesControl = new FormControl;

    this.salesControl.valueChanges.subscribe(value => {
      this.filterSales(value);
    });
  }

  ngOnInit(): void {
    this.getSalesFromApi();
  }

  getSalesFromApi(): void {
    this.salesService.getAllSales().subscribe(
      response => {
        this.sales = response;
        this.filteredSales = this.sales.slice();
      },
      error => {
        console.error(error);
      }
    );
  }

  createSales(): void {
    const dialogRef = this.dialog.open(CreateSalesComponent);


    dialogRef.afterClosed().subscribe((result: { nomPais: string, nomCiutat: string, nomOficina: string, nomSala: string } | undefined) => {
      console.log('Valors del formulari:', result);
      if (result) {
        const { nomPais, nomCiutat, nomOficina, nomSala } = result;

        alert(`NomPais ${nomPais}  NomCiutat  ${nomCiutat}  nomOficina   ${nomOficina}  nomSala  ${nomSala}`);

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
        this.salesService.createSalesByNom(nomPais, nomCiutat, nomOficina, nomSala).subscribe(

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
      this.salesService.deleteSalesByNom(sala.nomSala).subscribe(
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

        this.salesService.updateSala(result).subscribe(
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


  /*filterSales(value: string) {

    const valueLowerCase = value.toLowerCase();
    this.filteredSales = this.sales.filter(sala => {
      const nomSalaLowerCase = sala.nomSala.toLowerCase();
      const trimmedSalaName = nomSalaLowerCase.replace('sala ', '');
      return trimmedSalaName.startsWith(valueLowerCase);
    });
  }*/

  filterSales(value: string) {
    const valueLowerCase = value.trim().toLowerCase();

    this.filteredSales = this.sales.filter(sala => {
      const nomSalaLowerCase = sala.nomSala.toLowerCase();
      const trimmedSalaName = nomSalaLowerCase.replace('sala ', '').trim();

      return fuzzysearch(valueLowerCase, trimmedSalaName);
    });
  }
}
