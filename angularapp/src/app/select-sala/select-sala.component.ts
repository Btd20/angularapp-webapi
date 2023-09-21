import { Component, OnInit, Output, EventEmitter, Injectable, Input } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable, Subject } from 'rxjs';


interface Sala {
  value: number;
  nomSala: string;
}

@Component({
  selector: 'selectSala',
  templateUrl: 'select-sala.component.html',
})

export class SelectSala implements OnInit {
  @Output() salaSeleccionada: EventEmitter<number> = new EventEmitter<number>();
  @Input() pais: string  = '';
  @Input() ciutat: string  = '';
  @Input() nomOficina: string = '';
  sales: Sala[] = [];
  selectedSala: number = 0;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {

    //this.getAllSalesFromApi();
    this.getSalesByOfiFromApi();
    console.log('Aquesta es la info de la ofi :' + this.pais, this.ciutat, this.nomOficina);
    console.log("les sales venen de select sala");
    alert(this.pais + this.ciutat + this.nomOficina);
    console.log('Contingut de la sala:', JSON.stringify(this.sales));

  } 

  getAllSalesFromApi(): void {
    this.apiService.getAllSales().subscribe(
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

  onSalaSeleccionada(salaId: number) {
    //alert(`${this.selectedSala}`);
    this.selectedSala = salaId;
    this.salaSeleccionada.emit(this.selectedSala);
  }

  


}
