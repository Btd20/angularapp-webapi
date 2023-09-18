import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { AuthService } from '../auth-service.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateReservaComponent } from '../create-reserva/create-reserva.component';
import { Router } from '@angular/router';



@Component({
  selector: 'app-admin-modifyreserves',
  templateUrl: 'admin-modifyreserves.component.html',
  styleUrls: ['admin-modifyreserves.component.css']
})
export class AdminMRVComponent implements OnInit {
  reserves: any[] = [];
  isAdmin?: boolean;
  currentPage: number = 1;
  pageSize: number = 2;

  constructor(private apiService: ApiService, private authService: AuthService, private router: Router) {
    this.isAdmin = authService.isAdmin;
  }

  ngOnInit(): void {
    this.getAllReservesFromApi();
  }

  getAllReservesFromApi(): void {
    this.apiService.getAllReserves().subscribe(
      response => {
        this.reserves = response;
      },
      error => {
        console.error(error);
      }
    );
  }

  formatTimeSpan(timeSpan: string): string {
    const parts = timeSpan.split(':');
    const hours = parts[0];
    const minutes = parts[1];
    return `${hours}:${minutes}`;
  }

  formatDateString(dateString: string): string {
    const date = new Date(dateString);
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  eliminarReserva(id: string): void {
    this.apiService.eliminarReserva(id).subscribe(
      () => {
        console.log('Reserva eliminada.');
        this.getAllReservesFromApi();
      },
      (error) => {
        console.error('Error al eliminar la reserva:', error);
      }
    );
  }

  modificarReserva(reservaId: string, dataInici: string, dataFi: string, dataReserva: string) {
    // Navega a la pàgina "Modify Reserves" i passa l'ID de la reserva i les dates com a paràmetres de ruta
    this.router.navigate(['/modify-reserves', reservaId, dataInici, dataFi, dataReserva]);
  }
 
  get totalPages(): number {
    return Math.ceil(this.reserves.length / this.pageSize); // Total de páginas
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
