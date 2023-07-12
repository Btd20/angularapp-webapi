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

  constructor(private apiService: ApiService, private router: Router) { }

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

  mostrarCiutats(pais: any): void {
    this.router.navigate(['/ciutats', pais.nomPais]);
  }
}
