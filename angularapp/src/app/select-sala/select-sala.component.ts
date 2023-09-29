import { Component, OnInit, Output, EventEmitter, Injectable, Input } from '@angular/core';
import { ApiService } from '../api.service'; 
import { Observable, Subject } from 'rxjs';
import { SalesService } from '../sales.service';


interface Sala {
  value: number;
  nomSala: string;
}

@Component({
  selector: 'selectSala',
  templateUrl: 'select-sala.component.html',
  styleUrls: ['./select-sala.component.css']
})

export class SelectSala implements OnInit {
  @Output() salaSeleccionada: EventEmitter<number> = new EventEmitter<number>();
  @Input() pais: string  = '';
  @Input() ciutat: string  = '';
  @Input() nomOficina: string = '';
  sales: Sala[] = [];
  selectedSala: number = 0;

  constructor(private apiService: ApiService, private salesService: SalesService) { }

  ngOnInit(): void {

    if (this.nomOficina && this.nomOficina !== 'No seleccionat') {
      this.getSalesByOfiFromApi();
    } else {
      this.getAllSalesFromApi();
    }

  } 

  getAllSalesFromApi(): void {
    this.salesService.getAllSales().subscribe(
      response => {
        this.sales = response.map(sala => ({ value: sala.meetingRoomID, nomSala: sala.nomSala }));
        if (this.sales.length > 0) {
          this.selectedSala = this.sales[0].value;
        }
      },
      error => {
        console.error(error);
      }
    );
  }

  getSalesByOfiFromApi(): void {
    this.apiService.getSalaByOficina(this.pais, this.ciutat, this.nomOficina).subscribe(
      response => {
        
        this.sales = response.map(sala => ({ value: sala.meetingRoomID, nomSala: sala.nomSala }));
      },
      error => {
        console.error(error);
      }
    );
  }

 /* onSalaSeleccionada(salaId: number) {
    //alert(`${this.selectedSala}`);
    this.selectedSala = salaId;
    this.salaSeleccionada.emit(this.selectedSala);
  }
  */

  onSalaSeleccionada(event: any) {
    const selectedValue = parseInt(event.target.value, 10); 
    this.selectedSala = selectedValue;
    this.salaSeleccionada.emit(selectedValue);
  }
  


}
