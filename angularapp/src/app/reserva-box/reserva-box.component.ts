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

}
