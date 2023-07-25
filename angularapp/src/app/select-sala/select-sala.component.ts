import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NgFor } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ActivatedRoute, Route } from '@angular/router';
import { ApiService } from '../api.service';
import { AuthService } from '../auth-service.service';

interface Sala {
  value: string;
  viewValue: string;
}

/**
 * @title Basic select
 */
@Component({
  selector: 'selectSala',
  templateUrl: 'select-sala.component.html',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, NgFor, MatInputModule, FormsModule],
})
export class SelectSala implements OnInit {

  sales: Sala[] = [];
  pais: string = '';
  ciutat: string = '';
  oficina: string = '';

  constructor(private apiService: ApiService)
  {

  }

  ngOnInit(): void {
    this.getAllSalesFromApi();
  }

  getAllSalesFromApi(): void {
    this.apiService.getAllSales().subscribe(
      (response: any[]) => {
        this.sales = response.map(sala => ({ value: sala.meetingRoomID, viewValue: sala.nomSala }));
      },
      error => {
        console.error(error);
      }
    );
  }
}
