import { Component, Input } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'reserva-box',
  templateUrl: './reserva-box.component.html',
  styleUrls: ['./reserva-box.component.css']
})
export class ReservaBoxComponent {
  @Input() reserva: any;
  username: string | null = sessionStorage.getItem("username");

  constructor(private apiService: ApiService) { }

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
    this.apiService.eliminarReserva(id).subscribe(
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
}
