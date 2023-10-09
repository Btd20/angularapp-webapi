import { Component, Input } from '@angular/core';
import { ApiService } from '../api.service';
import { ReservesService } from '../reserves.service';
import { Router } from '@angular/router';

@Component({
  selector: 'reserva-box',
  templateUrl: './reserva-box.component.html',
  styleUrls: ['./reserva-box.component.css']
})
export class ReservaBoxComponent {
  @Input() reserva: any;
  username: string | null = sessionStorage.getItem("username");

  constructor(private apiService: ApiService, private reservesService: ReservesService, private router: Router) { }

  ngOnInit() {
    console.log(this.reserva);

  }

  formatTimeSpan(timeSpan: string): string {
    const parts = timeSpan.split(':');
    const hours = parts[0];
    const minutes = parts[1];
    return `${hours}:${minutes}`;
  }

  eliminarReserva(id: string): void {
    this.reservesService.eliminarReserva(id).subscribe(
      () => {
        console.log('Reserva eliminada.');
        //this.getAllReservesFromApi();
      },
      (error) => {
        console.error('Error al eliminar la reserva:', error);
      }
    );
  }

  eliminarReservaBox() {
    this.eliminarReserva(this.reserva.reserveID);
  }

  modificarReserva() {
    console.log('ReservaId:', this.reserva.reserveId);
    console.log('DataInici:', this.reserva.horaInici);
    console.log('DataFi:', this.reserva.horaFi);
    console.log('DataReserva:', this.reserva.dataReserva);
    this.router.navigate(['/modify-reserves', this.reserva.reserveID, this.reserva.horaInici, this.reserva.horaFi, this.reserva.dataReserva]);
  }

}
