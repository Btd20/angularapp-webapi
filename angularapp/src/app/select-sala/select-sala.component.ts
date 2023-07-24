import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NgFor } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

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
  ngOnInit(): void {
    //this.getAllSalesFromApi();
  }

  sales: Sala[] = [
    { value: 'UWU', viewValue: 'UWU' }
  ];


}
