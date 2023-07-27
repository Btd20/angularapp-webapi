import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-ferreserva',
  templateUrl: './fer-reserva.component.html',
  styleUrls: ['./fer-reserva.component.css'],
})
export class FerReservaComponent implements OnInit {
  username: string | null = sessionStorage.getItem('username');
  pais: string | null = sessionStorage.getItem('pais');
  oficina: string | null = sessionStorage.getItem('oficina');

  sales: any[] = [];
  selectedSala: string | undefined;

  paisReserva: string = '';
  ciutatReserva: string = '';
  oficinaReserva: string = '';
  salaReserva: string = '';

  constructor(private route: ActivatedRoute, private apiService: ApiService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.paisReserva = params['pais'];
      this.ciutatReserva = params['ciutat'];
      this.oficinaReserva = params['oficina'];
      this.getAllSalesFromApi();
      //this.salaReserva = params['sales'];
      //alert(`${this.paisReserva}    ${this.ciutatReserva}   ${this.oficinaReserva}`);
    })
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
}
