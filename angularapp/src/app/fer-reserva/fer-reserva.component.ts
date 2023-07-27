import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ferreserva',
  templateUrl: './fer-reserva.component.html',
  styleUrls: ['./fer-reserva.component.css'],
})
export class FerReservaComponent implements OnInit {
  username: string | null = sessionStorage.getItem('username');
  pais: string | null = sessionStorage.getItem('pais');
  oficina: string | null = sessionStorage.getItem('oficina');
  userid: string | null = sessionStorage.getItem('id');

  paisReserva: string = '';
  ciutatReserva: string = '';
  oficinaReserva: string = '';
  salaReserva: string = '';

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.paisReserva = params['pais'];
      this.ciutatReserva = params['ciutat'];
      this.oficinaReserva = params['oficina'];
      //this.salaReserva = params['sales'];
      alert(`${this.paisReserva}    ${this.ciutatReserva}   ${this.oficinaReserva}   ${this.userid}`);
    })
  }
}
