import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-oficines',
  templateUrl: './oficines.component.html',
  styleUrls: ['./oficines.component.css']
})
export class OficinesComponent implements OnInit {
  oficines: any[] = [];

  constructor(private router: Router, private route: ActivatedRoute, private apiService: ApiService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const pais = params['pais'];
      const ciutat = params['ciutat'];
      this.getOficinesByCiutats(pais, ciutat);
    });
  }

  getOficinesByCiutats(pais: string, ciutat: string): void {
    this.apiService.getOficinesByCiutats(pais, ciutat).subscribe(
      response => {
        this.oficines = response;
      },
      error => {
        console.error(error);
      }
    );
  }
}
