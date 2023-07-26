import { Component, ViewEncapsulation } from '@angular/core';
import { MatCalendarCellClassFunction, MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';

/** @title Datepicker with custom date classes */
@Component({
  selector: 'DatepickerDate',
  templateUrl: 'datapicker-reserva.component.html',
  styleUrls: ['datapicker-reserva.component.css'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatNativeDateModule, MatDatepickerModule],
})
export class DatepickerDate {


  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    // Only highligh dates inside the month view.
    if (view === 'month') {
      const date = cellDate.getDate();
    }

    return '';
  };

  dateFilter = (date: Date | null) => {
    if (!date) {
      return false;
    }

    const day = date.getDay();
    return day !== 0 && day !== 6;
  }

}
