import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { AuthService } from '../auth-service.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateCiutatComponent } from '../create-ciutat/create-ciutat.component';
import { UpdateCiutatComponent } from '../update-ciutat/update-ciutat.component';
import { FormControl } from '@angular/forms';
import fuzzysearch from 'fuzzysearch-ts';
import { CiutatsService } from '../ciutats.service';



@Component({
  selector: 'app-admin-modifyciutats',
  templateUrl: 'admin-modifyciutats.component.html',
  styleUrls: ['admin-modifyciutats.component.css']
})
export class AdminMCComponent implements OnInit {
  ciutats: any[] = [];
  isAdmin?: boolean;
  currentPage: number = 1;
  pageSize: number = 3;
  nomPais: string = '';
  nomCiutat: string = '';
  ciutatsControl = new FormControl();
  filteredCiutats: any[] = [];

  constructor(private authService: AuthService, private dialog: MatDialog, private ciutatsService: CiutatsService) {

    this.isAdmin = authService.isAdmin;
    this.filteredCiutats = this.ciutats.slice();

    this.ciutatsControl = new FormControl;

    this.ciutatsControl.valueChanges.subscribe(value => {
      this.filterCiutats(value);
    });
  }

  ngOnInit(): void {
    this.getCiutatsFromApi();
  }

  getCiutatsFromApi(): void {
    this.ciutatsService.getAllCiutats().subscribe(
      response => {
        this.ciutats = response;
        this.filteredCiutats = this.ciutats.slice();
      },
      error => {
        console.error(error);
      }
    );
  }

  createCiutats(): void {
    const dialogRef = this.dialog.open(CreateCiutatComponent);

    // Es subscriu per obtenir les dades un cop es tanca la finestra
    dialogRef.afterClosed().subscribe((result: { nomPais: string, nomCiutat: string } | undefined) => {
      if (result) {
        const { nomPais, nomCiutat } = result;

        if (nomCiutat.trim() === '') {
          console.error('El nom de la ciutat no pot estar buit.');
          return;
        }

        const ciutatRepetida = this.ciutats.find(ciutat => ciutat.nomCiutat === nomCiutat);
        if (ciutatRepetida) {
          console.error('Ja existeix una ciutat amb aquest nom.');
          return;
        }

        this.ciutatsService.createCiutatsByName(nomPais, nomCiutat).subscribe(
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

  deleteCiutats(ciutat: any): void {
    const confirmar = confirm('Estàs segur de que vols eliminar la ciutat?');
    if (confirmar) {
      this.ciutatsService.deleteCiutatsByNom(ciutat.nomCiutat).subscribe(
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

  updateCiutat(ciutat: any): void {
    console.log('Ciutat inicial:', JSON.stringify(ciutat));
    const dialogRef = this.dialog.open(UpdateCiutatComponent, {
      data: { ...ciutat }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {

        console.log('Resultat:', JSON.stringify(result));
        this.ciutatsService.updateCiutat(result).subscribe(
          response => {
            console.log('Ciutat actualitzat:', response);
            this.getCiutatsFromApi();
          },
          error => {
            console.log('Quan falla: ', JSON.stringify(result));
            console.error('Error al actualizar la ciutat:', error);
          }
        );
      }
    });
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

  filterCiutats(value: string) {

    const valueLowerCase = value.trim().toLowerCase();

    this.filteredCiutats = this.ciutats.filter(ciutat => {
      const nomCiutatsLowerCase = ciutat.nomCiutat.toLowerCase();

      return fuzzysearch(valueLowerCase, nomCiutatsLowerCase);
    });
  }
}
