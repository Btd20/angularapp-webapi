import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-paisos',
  templateUrl: './paisos.component.html',
  styleUrls: ['./paisos.component.css']
})
export class PaisosComponent implements OnInit {

  paisos!: any[];
  ciutats!: any[];


  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getPaisosFromApi();
  }

  getPaisosFromApi(): void {
    this.apiService.getPaisos().subscribe(
      response => {
        console.log(response);
        this.paisos = response;
      },
      error => {
        console.error(error);
      }
    );

  }

  getCiutats(pais: string): void {
    this.apiService.getCiutats(pais).subscribe(
      response => {
        console.log(response);
        this.ciutats = response;
      },
      error => {
        console.error(error);
      }
    );
  }

}