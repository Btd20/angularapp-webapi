import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NgFor } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

interface Hora {
  value: string;
  viewValue: string;
}

/**
 * @title Basic select
 */
@Component({
  selector: 'selectReserva',
  templateUrl: 'select-reserva.component.html',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, NgFor, MatInputModule, FormsModule],
})
export class SelectReserva {
  hores: Hora[] = [
    { value: 'nou-0', viewValue: '09:00' },
    { value: 'deu-1', viewValue: '10:00' },
    { value: 'onze-2', viewValue: '11:00' },
    { value: 'dotze-0', viewValue: '12:00' },
    { value: 'tretze-0', viewValue: '13:00' },
    { value: 'cat-0', viewValue: '14:00' },
    { value: 'quin-0', viewValue: '15:00' },
    { value: 'setz-0', viewValue: '16:00' },
    { value: 'set-0', viewValue: '17:00' },
    { value: 'div-0', viewValue: '18:00' },
  ];
}
