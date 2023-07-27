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

  constructor(private route: ActivatedRoute, private apiService: ApiService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
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
}
