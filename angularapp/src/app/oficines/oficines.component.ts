import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { AuthService } from '../auth-service.service';

@Component({
  selector: 'app-oficines',
  templateUrl: './oficines.component.html',
  styleUrls: ['./oficines.component.css']
})
export class OficinesComponent implements OnInit {
  oficines: any[] = [];
  pais: string = '';
  ciutat: string = '';
  isAdmin?: boolean;

  constructor(private router: Router, private route: ActivatedRoute, private apiService: ApiService, private authService: AuthService) {
    this.isAdmin = authService.isAdmin;
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const pais = params['pais'];
      const ciutat = params['ciutat'];

      if (pais && ciutat) {
        this.getOficinesByCiutats(pais, ciutat);
      } else {
        this.getAllOficinesFromApi();
      }
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

  getSalaByOficina(oficina: any): void {
    this.router.navigate(['/rooms', this.pais, this.ciutat, oficina.nomOficina]);
  }
}

