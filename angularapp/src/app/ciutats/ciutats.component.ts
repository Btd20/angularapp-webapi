import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-ciutats',
  templateUrl: './ciutats.component.html',
  styleUrls: ['./ciutats.component.css']
})
export class CiutatsComponent implements OnInit {
  ciutats: any[] = [];
  pais: string = '';
  oficines: any[] = [];

  constructor(private apiService: ApiService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.pais = params['pais'];

      if (this.pais) {
        this.getCiutatsFromApi();
      } else {
        this.getAllCiutatsFromApi();
      }
    });
  }

  getCiutatsFromApi(): void {
    if (this.pais) {
      this.apiService.getCiutatsByPais(this.pais).subscribe(
        response => {
          this.ciutats = response;
        },
        error => {
          console.error(error);
        }
      );
    }
  }

  getOficinesByCiutats(nomPais: string, nomCiutat: string): void {
    this.apiService.getOficinesByCiutats(nomPais, nomCiutat).subscribe(
      response => {
        this.oficines = response;
        this.router.navigate(['ciutats', nomPais, 'oficines', nomCiutat]);
      },
      error => {
        console.error(error);
      }
    );
  }

  getAllCiutatsFromApi(): void {
    this.apiService.getAllCiutats().subscribe(
      response => {
        this.ciutats = response;
      },
      error => {
        console.error(error);
      }
    );
  }
}

