import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-paisos',
  templateUrl: './paisos.component.html',
  styleUrls: ['./paisos.component.css']
})
export class PaisosComponent implements OnInit {
  paisos: any[] = [];
  

  constructor(private router: Router, private apiService: ApiService) { }

  ngOnInit(): void {
    this.getPaisosFromApi();
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

}
