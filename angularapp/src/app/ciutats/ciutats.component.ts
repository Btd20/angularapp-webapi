import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-ciutats',
  templateUrl: './ciutats.component.html',
  styleUrls: ['./ciutats.component.css']
})
export class CiutatsComponent implements OnInit {
  ciutats: any[] = [];
  pais: string = '';

  constructor(private route: ActivatedRoute, private apiService: ApiService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.pais = params['pais'];
      this.getCiutatsFromApi();
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
}
