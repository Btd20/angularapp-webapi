import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { AuthService } from '../auth-service.service';
import { ReservesService } from '../reserves.service';
import { FormControl } from '@angular/forms';
import fuzzysearch from "fuzzysearch-ts";
import { SalesService } from '../sales.service';

@Component({
  selector: 'app-reserves',
  templateUrl: './reserves.component.html',
  styleUrls: ['./reserves.component.css']
})
export class ReservesComponent implements OnInit {
  reserves: any[] = [];

  //BUSCADOR PER SALES. 
  sales: any[] = [];
  salaControl = new FormControl();
  filteredSala: any[] = [];
  

  constructor(private apiService: ApiService,
    private router: Router, private authService: AuthService, private reservesService: ReservesService) {

    this.filteredSala = this.sales.slice();

    this.salaControl = new FormControl();

    this.salaControl.valueChanges.subscribe(value => {
      this.filterSala(value);
    });
  }

  ngOnInit(): void {
    const userId = sessionStorage.getItem('id');

    if (userId !== null) {
      this.reservesService.getReservesByUser(userId)
        .subscribe(reservas => {
          this.reserves = this.sortReservesByDate(reservas);
        });
    }
  }

  filterSala(value: string) {
    const trimmedValue = value.trim().toLowerCase();

    this.filteredSala = this.sales.filter(usuari => {
      const trimmedUserName = usuari.userName.trim().toLowerCase();

      return fuzzysearch(trimmedValue, trimmedUserName);
    });
  }

  // mira que la data no hagi passat i ordena cronològicament les reserves per mostrar-les
  private sortReservesByDate(reserves: any[]): any[] {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    const validReserves = reserves.filter(reserva => new Date(reserva.dataReserva) >= currentDate
    )
    console.log(currentDate );
    return validReserves.sort((a, b) => new Date(a.dataReserva).getTime() - new Date(b.dataReserva).getTime()
    );
  }
}
