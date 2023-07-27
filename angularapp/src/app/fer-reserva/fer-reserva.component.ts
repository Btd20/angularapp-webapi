import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-ferreserva',
  templateUrl: './fer-reserva.component.html',
  styleUrls: ['./fer-reserva.component.css'],
})
export class FerReservaComponent implements OnInit{
  username: string | null = sessionStorage.getItem('username');
  pais: string | null = sessionStorage.getItem('pais');
  oficina: string | null = sessionStorage.getItem('oficina');
  dia: string = '';
  horaInici: string = '';
  horaFi: string = '';
  selectedSala: string = '';
  nomSala: string = '';

  constructor(private apiService: ApiService) { }

  ngOnInit() {
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
  }
  onSalaSeleccionada(sala: string): void {
    this.nomSala = sala;
  }

  reservarSala() {
    // Obtenim les dades de reserva dels camps del formulari
    const nomSala = this.nomSala; // Omple aquest valor amb el nom de la sala seleccionada
    const dataReserva = this.dia;
    const horaInici = this.horaInici;
    const horaFi = this.horaFi;

    console.log(`Nom de la sala: ${nomSala}, Data Reserva: ${dataReserva}, Hora inici: ${horaInici}, Hora fi: ${horaFi}`);

    // Fem la crida al backend per crear la reserva
    this.apiService.CreateReserva(nomSala, dataReserva, horaInici, horaFi).subscribe(
      (resposta) => {
        // Aquí pots tractar la resposta del backend, si és necessari
        console.log('Reserva creada amb èxit:', resposta);
      },
      (error) => {
        // En cas d'error, mostra un missatge o fes alguna acció addicional
        console.error('Error en crear la reserva:', error);
      }
    );
  }
}
