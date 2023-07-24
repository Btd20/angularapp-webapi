import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { AuthService } from '../auth-service.service';
import { CreateOficinesComponent } from '../create-oficines/create-oficines.component';
import { MatDialog } from '@angular/material/dialog';
import { UpdateOficinaComponent } from '../update-oficina/update-oficina.component';

@Component({
  selector: 'app-admin-modifyoficines',
  templateUrl: 'admin-modifyoficines.component.html',
  styleUrls: ['admin-modifyoficines.component.css']
})
export class AdminMOComponent implements OnInit {
  oficines: any[] = [];
  isAdmin?: boolean;
  currentPage: number = 1;
  pageSize: number = 5;
  nomCiutat: string = '';
  nomPais: string = '';
  nomOficina: string = '';

  constructor(private apiService: ApiService, private authService: AuthService, private dialog: MatDialog) {
    this.isAdmin = authService.isAdmin;
  }

  ngOnInit(): void {
    this.getOficinesFromApi();
  }

  getOficinesFromApi(): void {
    this.apiService.getAllOficines().subscribe(
      response => {
        this.oficines = response;
      },
      error => {
        console.error(error);
      }
    );
  }

  createOficines(): void {
    const dialogRef = this.dialog.open(CreateOficinesComponent);

    
    dialogRef.afterClosed().subscribe((result: { nomPais: string, nomCiutat: string, nomOficina: string } | undefined) => {
      console.log('Valores del formulario:', result);
      if (result) {
        const { nomPais, nomCiutat, nomOficina } = result;
        console.log('Valores desestructurados:', nomPais, nomCiutat, nomOficina);
        this.apiService.createOficinesByNom(nomPais, nomCiutat, nomOficina).subscribe(

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
        this.apiService.updateOficina(result).subscribe(
          response => {
            console.log('Oficina actualitzat:', response);
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
      this.apiService.deleteOficinesByNom(oficina.nomOficina).subscribe(
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
}
