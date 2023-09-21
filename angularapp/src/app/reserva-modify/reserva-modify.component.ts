import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  horaInici: any;
  horaFi: any;
  dataReserva: any;


  constructor(private route: ActivatedRoute, private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.reservaId = params['reservaId'];
      this.horaInici = params['horaInici'];
      this.horaFi = params['horaFi'];
      this.dataReserva = params['dataReserva'];
      this.getAllSalesFromApi();
      this.loadReserva();
      console.log(this.reservaId,this.horaInici, this.horaFi, this.dataReserva);
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
        this.router.navigate(['/reserves']);
        //this.getAllReservesFromApi();
      },
      (error) => {
        console.error('Error al eliminar la reserva:', error);
        alert('No es pot eliminar la reserva');
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
    const reservaActualitzada = {                  //per alguna raó es feia un load de la anterior al donar a modificar així que amb una constant
      horaInici: this.reserva.horaInici,           // assegure'm que no es reverteixin els canvis
      horaFi: this.reserva.horaFi,
      dataReserva: this.reserva.dataReserva
    };

    this.apiService.updateReserva(
      this.reservaId,
      reservaActualitzada.horaInici,
      reservaActualitzada.horaFi,
      reservaActualitzada.dataReserva
    ).subscribe(
      (resposta) => {
        console.log('Reserva actualitzada correctament:', resposta);
        this.router.navigate(['/reserves']);
      },
      (error) => {
        console.error('Error en actualitzar la reserva:', error);
        alert('Ha fallat la modificació de reserva');
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
