import { Component } from '@angular/core';


@Component({
  selector: 'app-ferreserva',
  templateUrl: './fer-reserva.component.html',
  styleUrls: ['./fer-reserva.component.css'],
})
export class FerReservaComponent {
  username: string | null = sessionStorage.getItem('username');
  pais: string | null = sessionStorage.getItem('pais');
  oficina: string | null = sessionStorage.getItem('oficina');
}
