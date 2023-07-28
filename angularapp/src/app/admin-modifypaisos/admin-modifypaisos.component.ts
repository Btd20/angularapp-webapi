import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { AuthService } from '../auth-service.service';
import { MatDialog } from '@angular/material/dialog';
import { CreatePaisComponent } from '../create-pais/create-pais.component';
import { UpdatePaisComponent } from '../update-pais/update-pais.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-modifypaisos',
  templateUrl: 'admin-modifypaisos.component.html',
  styleUrls: ['admin-modifypaisos.component.css']
})
export class AdminMPComponent implements OnInit {
  isAdmin?: boolean;
  currentPage: number = 1;
  pageSize: number = 4;
  paisos: any[] = [];

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) {
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
    const dialogRef = this.dialog.open(CreatePaisComponent, {});

    dialogRef.afterClosed().subscribe((result: { nomPais: string } | undefined) => {
      if (result && result.nomPais.trim() !== '') {
        const nomPais = result.nomPais.trim();

        // Check for duplicates
        const paisExists = this.paisos.some(pais => pais.nomPais.toLowerCase() === nomPais.toLowerCase());
        if (paisExists) {
          alert('El país ja existeix.');
          return;
        }

        const nouPais = { nomPais };
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
    console.log('Pais inicial:', JSON.stringify(pais)); 
    const dialogRef = this.dialog.open(UpdatePaisComponent, {
      data: { ...pais }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        console.log('Resultat:', JSON.stringify(result)); 

        if (result.nomPais.trim() === '') {
          alert('El nom del pais no pot estar buit.');
          return;
        }

        const paisExists = this.paisos.find(pais => pais.nomPais === result.nomPais && pais.CountryID !== result.countryID);
        if (paisExists) {
          alert('Ja existeix un pais amb aquest nom.');
          return;
        }


        this.apiService.updatePais(result).subscribe(
          response => {
            console.log('País actualitzat:', response);
            this.getPaisosFromApi();
          },
          error => {
            console.log('Quan falla: ', JSON.stringify(result));
            console.error('Error al actualizar el país:', error);
          }
        );
      }
    });
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
