import { Component, OnInit, EventEmitter } from '@angular/core';
import { ApiService } from '../api.service';
import { ReservesService } from '../reserves.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectSala } from '../select-sala/select-sala.component';
import { SalesService } from '../sales.service';

@Component({
  selector: 'app-ferreserva',
  templateUrl: './fer-reserva.component.html',
  styleUrls: ['./fer-reserva.component.css'],
})
export class FerReservaComponent implements OnInit {
  userid: string | null = sessionStorage.getItem('id');
  username: string | null = sessionStorage.getItem('username');
  pais: string | null = sessionStorage.getItem('pais');
  ciutat: string | null = sessionStorage.getItem('ciutat');
  oficina: string | null = sessionStorage.getItem('oficina');
  minDate: string = '';
  dia: string = '';
  horaInici: string = '';
  horaFi: string = '';
  meetingRoomID: number = 0;
  sales: any[] = [];
  selectedSala: string | undefined;

  paisReserva: string = '';
  ciutatReserva: string = '';
  oficinaReserva: string = '';
  salaReserva: string = '';
  nomSala: string = '';

  selectedValue = 5;

  showValue(event: any) {
    this.selectedValue = event.target.value;
  }
  constructor(private apiService: ApiService, private reservesService: ReservesService, private route: ActivatedRoute, private router: Router, private salesService: SalesService) { }
  
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.meetingRoomID = +params['salaID'];
      this.minDate = this.dia;

      this.apiService.obtenirDadesGeolocalitzacio().subscribe(data => {
        this.pais = data.pais;
        this.ciutat = data.ciutat;
        this.oficina = data.oficina;
      });

      if (this.oficinaReserva) {
        this.getSalesByOfiFromApi();
      } else {
        this.paisReserva = this.pais || '';
        this.ciutatReserva = this.ciutat || '';
        this.oficinaReserva = this.oficina || '';
        this.getSalesByOfiFromUser();
      }
    });

    // Obtenir la data actual i convertir-la al format AAAA-MM-DD
    const dataActual = new Date();
    const any = dataActual.getFullYear();
    const mes = String(dataActual.getMonth() + 1).padStart(2, '0');
    const dia = String(dataActual.getDate()).padStart(2, '0');
    this.dia = `${any}-${mes}-${dia}`;

    const hora = String(dataActual.getHours()).padStart(2, '0');
    const minuts = String(dataActual.getMinutes()).padStart(2, '0');
    this.horaInici = `${hora}:${minuts}`;
    this.horaFi = `${hora}:${minuts}`;

    this.minDate = this.dia;
  }

  reservarSala() {
    const meetingRoomID = this.meetingRoomID;
    const dataReserva = this.dia;
    const horaInici = this.horaInici;
    const horaFi = this.horaFi;
    const userID = this.userid || '';
    const validHora = this.validateHoraIniciFi();




    if (!validHora) {
      alert('L\'hora d\'inici ha de ser anterior a l\'hora de finalització.');
      return;
    }

    console.log(`id de la sala: ${meetingRoomID}, Data Reserva: ${dataReserva}, Hora inici: ${horaInici}, Hora fi: ${horaFi}, idUsuari: ${this.userid}`);

    this.reservesService.CreateReserva(meetingRoomID, dataReserva, horaInici, horaFi, userID).subscribe(
      (resposta) => {
        console.log('Reserva creada amb èxit:', resposta);
        this.router.navigate(['/reserves']);
      },
      (error) => {
        console.error('Error en crear la reserva:', error);
        alert("Ups! Algo ha fallat");
      }
    );
  }


  onSalaSeleccionada(salaId: number) {
    this.meetingRoomID = salaId;
  }

  getAllSalesFromApi(): void {
    this.salesService.getAllSales().subscribe(
      response => {
        this.sales = response;
      },
      error => {
        console.error(error);
      }
    );
  }

  getSalesByOfiFromApi(): void {
    this.apiService.getSalaByOficina(this.paisReserva, this.ciutatReserva, this.oficinaReserva).subscribe(
      response => {
        this.sales = response;

      },
      error => {
        console.error(error);
      }
    );
  } 

  getSalesByOfiFromUser(): void {
    if (!this.pais && !this.ciutat && !this.oficina) {
      this.getAllSalesFromApi();
    } else {
      this.apiService.getSalaByOficina(this.pais || '', this.ciutat || '', this.oficina || '').subscribe(
        response => {
          this.sales = response;
        },
        error => {
          console.error(error);
        }
      );
    }
  }

  validateHoraIniciFi(): boolean {
    const horaInici = new Date(`2000-01-01T${this.horaInici}`);
    const horaFi = new Date(`2000-01-01T${this.horaFi}`);
    return horaInici < horaFi;
  }

}
