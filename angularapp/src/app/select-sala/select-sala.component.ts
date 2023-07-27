import { Component, OnInit, Output, EventEmitter, Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable, Subject } from 'rxjs';

interface Sala {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'selectSala',
  templateUrl: 'select-sala.component.html',
})

export class SelectSala implements OnInit {
  @Output() salaSeleccionada: EventEmitter<number> = new EventEmitter<number>();
  sales: Sala[] = [];
  selectedSala: number = 0;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getAllSalesFromApi();
  }

  getAllSalesFromApi(): void {
    this.apiService.getAllSales().subscribe(
      (response: any[]) => {
        this.sales = response.map(sala => ({ value: sala.meetingRoomID, viewValue: sala.nomSala }));
        if (this.sales.length > 0) {
          this.selectedSala = this.sales[1].value;
          
        }
      },
      error => {
        console.error(error);
      }
    );
  }

  onSalaSeleccionada() {
    alert(`${this.selectedSala}`);
    this.salaSeleccionada.emit(this.selectedSala);
  }
}
