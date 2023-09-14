import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'reserva-modify',
  templateUrl: './reserva-modify.component.html',
  styleUrls: ['./reserva-modify.component.css']
})
export class ReservaMComponent {
  username: string | null = sessionStorage.getItem('username');
  sales: any[] = [];
  selectedSala: string | undefined;
  reservaId: any;
  reserva: any;
  novaHoraInici: string = '';
  novaHoraFi: string = '';
  novaDataReserva: string = '';

  constructor(private route: ActivatedRoute, private apiService: ApiService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.reservaId = params['reservaId'];
      this.getAllSalesFromApi();
      this.loadReserva();
      console.log(this.reserva.dataReserva);
      //this.salaReserva = params['sales'];
      //alert(`${this.paisReserva}    ${this.ciutatReserva}   ${this.oficinaReserva}`);
    })
  }

  getAllReservesFromApi(): void {
    this.apiService.getAllReserves().subscribe(
      response => {
        this.sales = response;
      },
      error => {
        console.error(error);
      }
    );
  }

  getAllSalesFromApi(): void {
    this.apiService.getAllSales().subscribe(
      response => {
        this.sales = response;
      },
      error => {
        console.error(error);
      }
    );
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

  loadReserva() {
    this.apiService.getReserve(this.reservaId).subscribe(
      (response) => {
        this.reserva = response;
        this.reserva.dataReserva = new Date(this.reserva.dataReserva).toISOString().split('T')[0]; // recordatori personal: el input no agafa format dd/mm/yyyy aixi que s'ha de formatejar
      },
      (error) => {
        console.error('Error al carregar la reserva');
      }
    )
  }

  guardarReserva() {

    const reservaActualitzada = {
      horaInici: this.novaHoraInici,
      horaFi: this.novaHoraFi,
      dataReserva: this.novaDataReserva,
      reserveID: this.reservaId
    };

    // Crida la funció d'actualització del teu servei amb les noves dades
    this.apiService.updateReserva(reservaActualitzada).subscribe(
      (resposta) => {
        
        console.log('Reserva actualitzada correctament:', resposta);
      },
      (error) => {
        
        console.error('Error en actualitzar la reserva:', error);
      }
    );
  }
}








  /* DE MOMENT NO PUC
  getSalesByOfiFromApi(): void {
    this.apiService.getSalaByOficina(this.paisReserva, this.ciutatReserva, this.oficinaReserva).subscribe(
      response => {
        this.sales = response;
      },
      error => {
        console.error(error);
      }
    );
  }*/
