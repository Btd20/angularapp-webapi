import { Component } from '@angular/core';
import { GeoIpService } from '../geoip.service';

@Component({
  selector: 'app-provageoip',
  templateUrl: './provageoip.component.html',
  styleUrls: ['./provageoip.component.css']
})
export class ProvageoipComponent {

  constructor(private geoip: GeoIpService) { }

  ngOnInit(): void {
    this.getDataFromApi();
  }

  getDataFromApi(): void {
    this.geoip.getData().subscribe(
      response => {

      },
      error => {
        console.error(error);
      }
    );
  }

}
