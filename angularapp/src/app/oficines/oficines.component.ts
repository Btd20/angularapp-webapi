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
  oficina: any[] = []; 
  pais: string = '';
  ciutat: string = '';
  sales: any[] = [];
  isAdmin?: boolean;

  constructor(private router: Router, private route: ActivatedRoute, private apiService: ApiService, private authService: AuthService) {
    this.isAdmin = authService.isAdmin;
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
     // alert(JSON.stringify(params));

      this.pais = params['pais'];
      this.ciutat = params['ciutat'];
      this.oficina = params['oficina'];

      if (this.pais && this.ciutat) {
        this.getOficinesByCiutats(this.pais, this.ciutat);
      } else {
        this.getAllOficinesFromApi();
      }
    });
  }

  getOficinesByCiutats(pais: string, ciutat: string): void {
    this.apiService.getOficinesByCiutats(pais, ciutat).subscribe(
      response => {
        this.oficina = response; 
      },
      error => {
        console.error(error);
      }
    );
  }

  getAllOficinesFromApi(): void {
    this.apiService.getAllOficines().subscribe(
      response => {
        this.oficina = response; 
      },
      error => {
        console.error(error);
      }
    );
  }

  getSalaByOficina(pais: string, ciutat: string, oficina: string): void {
    this.apiService.getSalaByOficina(pais, ciutat, oficina).subscribe(
      response => {
        this.sales = response;
        console.log(this.sales);
      },
      error => {
        console.error(error);
      }
    );
  }

  navigateToRooms(nomOficina: string) {
    const pais = this.pais;
    const ciutat = this.ciutat;
    this.router.navigate(['/oficines', pais, ciutat, nomOficina, 'sales']); //la ruta màgica 
  }

 
}
