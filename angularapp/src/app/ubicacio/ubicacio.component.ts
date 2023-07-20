import { Component } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-ubicacio',
  templateUrl: './ubicacio.component.html',
  styleUrls: ['./ubicacio.component.css']
})
export class UbicacioComponent {
  paisos: any[] = [];
  oficines: any[] = [];
  selectedCountry: string | undefined;
  selectedOffice: string | undefined;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getPaisosFromApi();
    this.getAllOficinesFromApi();
  }

  getPaisosFromApi(): void {
    this.apiService.getPaisos().subscribe(
      response => {
        this.paisos = response;
      },
      error => {
        console.error(error);
      }
    );
  }

  getAllOficinesFromApi(): void {
    this.apiService.getAllOficines().subscribe(
      response => {
        this.oficines = response;
      },
      error => {
        console.error(error);
      }
    );
  }

  guardarPais(): void {
    if (this.selectedCountry) {
      const username = sessionStorage.getItem('username') ?? '';
      this.apiService.guardarPais(username, this.selectedCountry);
    }
  }

  guardarOficina(): void {
    if (this.selectedOffice) {
      const username = sessionStorage.getItem('username') ?? '';
      this.apiService.guardarOficina(username, this.selectedOffice);
    }
  }
}
