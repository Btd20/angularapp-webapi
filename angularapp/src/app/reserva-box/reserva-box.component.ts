import { Component, Input } from '@angular/core';

@Component({
  selector: 'reserva-box',
  templateUrl: './reserva-box.component.html',
  styleUrls: ['./reserva-box.component.css']
})
export class ReservaBoxComponent {
  @Input() reserva: any;
  username: string | null = sessionStorage.getItem("username");

  ngOnInit() {
    console.log(this.reserva);
  }

  formatTimeSpan(timeSpan: string): string {
    const parts = timeSpan.split(':');
    const hours = parts[0];
    const minutes = parts[1];
    return `${hours}:${minutes}`;
  }
}
