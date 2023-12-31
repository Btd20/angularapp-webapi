import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { AuthService } from '../auth-service.service';
import { CreateOficinesComponent } from '../create-oficines/create-oficines.component';
import { MatDialog } from '@angular/material/dialog';
import { UpdateOficinaComponent } from '../update-oficina/update-oficina.component';
import { FormControl } from '@angular/forms';
import fuzzysearch from "fuzzysearch-ts";
import { OficinesService } from '../oficines.service';

@Component({
  selector: 'app-admin-modifyoficines',
  templateUrl: 'admin-modifyoficines.component.html',
  styleUrls: ['admin-modifyoficines.component.css']
})
export class AdminMOComponent implements OnInit {
  oficines: any[] = [];
  isAdmin?: boolean;
  currentPage: number = 1;
  pageSize: number = 3;
  nomCiutat: string = '';
  nomPais: string = '';
  nomOficina: string = '';
  oficinesControl = new FormControl();
  filteredOficines: any[] = [];

  constructor(private apiService: ApiService, private authService: AuthService, private dialog: MatDialog, private oficinesService: OficinesService) {
    this.isAdmin = authService.isAdmin;
    this.filteredOficines = this.oficines.slice();

    this.oficinesControl = new FormControl;

    this.oficinesControl.valueChanges.subscribe(value => {
      this.filterOficines(value);
    });
  }

  ngOnInit(): void {
    this.getOficinesFromApi();
  }

  getOficinesFromApi(): void {
    this.oficinesService.getAllOficines().subscribe(
      (response: any[]) => {
        this.oficines = response;
        this.filteredOficines = this.oficines.slice();
      },
      error => {
        console.error(error);
      }
    );
  }

  createOficines(): void {
    const dialogRef = this.dialog.open(CreateOficinesComponent);

    dialogRef.afterClosed().subscribe((result: { nomPais: string, nomCiutat: string, nomOficina: string } | undefined) => {
      console.log('Valors del formulari:', result);
      if (result) {
        const { nomPais, nomCiutat, nomOficina } = result;
        console.log('Valors desestructurats:', nomPais, nomCiutat, nomOficina);

        // Validar que els noms de la ciutat i de l'oficina no siguin espais en blanc
        if (nomCiutat.trim() === '' || nomOficina.trim() === '') {
          alert('Els noms de la ciutat i de l\'oficina no poden estar buits.');
          return;
        }

        const oficinaRepetida = this.oficines.find(oficina => oficina.nomOficina === nomOficina);
        if (oficinaRepetida) {
          alert('Ja existeix una oficina amb aquest nom.');
          return;
        }

        this.oficinesService.createOficinesByNom(nomPais, nomCiutat, nomOficina).subscribe(
          response => {
            console.log('Oficina creada: ', response);
            this.getOficinesFromApi();
          },
          error => {
            console.error('Error al crear la oficina: ', error);
          }
        );
      }
    });
  }

  updateOficina(oficina: any): void {
    console.log('Oficina inicial:', JSON.stringify(oficina));
    const dialogRef = this.dialog.open(UpdateOficinaComponent, {
      data: { ...oficina }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {

        console.log('Resultat:', JSON.stringify(result));
        if (result.nomOficina.trim() === '') {
          console.error('El nom de l\'oficina no pot estar buit.');
          return;
        }

        const oficinaRepetida = this.oficines.find(oficina => oficina.nomOficina === result.nomOficina && oficina.officeID !== result.officeID);
        if (oficinaRepetida) {
          console.error('Ja existeix una oficina amb aquest nom.');
          return;
        }

        this.oficinesService.updateOficina(result).subscribe(
          response => {
            console.log('Oficina actualitzada:', response);
            this.getOficinesFromApi();
          },
          error => {
            console.log('Quan falla: ', JSON.stringify(result));
            console.error('Error al actualizar la oficina:', error);
          }
        );
      }
    });
  }

  deleteOficina(oficina: any): void {
    const confirmar = confirm('Estàs segur de que vols eliminar la oficina?');
    if (confirmar) {
      this.oficinesService.deleteOficinesByNom(oficina.nomOficina).subscribe(
        response => {
          console.log('Oficina eliminada: ', response);
          this.getOficinesFromApi();
        },
        error => {
          console.error('Error al eliminar la oficina: ', error);
        }
      );
    }
  }

  get totalPages(): number {
    return Math.ceil(this.oficines.length / this.pageSize);
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

  
  filterOficines(value: string) {

    const valueLowerCase = value.trim().toLowerCase();
    this.filteredOficines = this.oficines.filter(oficina => {
      const nomOficinaLowerCase = oficina.nomOficina.toLowerCase();
      const trimmedOficinaName = nomOficinaLowerCase.replace('acme ', '').trim();
      return fuzzysearch(valueLowerCase,nomOficinaLowerCase);
    });
  }

}
