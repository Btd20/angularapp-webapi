import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { AuthService } from '../auth-service.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {
  sales: any[] = [];
  pais: string = '';
  ciutat: string = '';
  oficina: string = '';
  isAdmin?: boolean;

  constructor(private apiService: ApiService, private route: ActivatedRoute,
    private authService: AuthService) {
    this.isAdmin = authService.isAdmin;
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.pais = params['pais'];
      this.ciutat = params['ciutat'];
      this.oficina = params['oficina'];
      //alert(`${this.pais}    ${this.ciutat}   ${this.oficina}`);

      if (this.pais && this.ciutat && this.oficina) {
        this.getSalaByOficina(this.pais, this.ciutat, this.oficina);
      } else {
        this.getAllSalesFromApi();
      }
    });
  }

  getAllSalesFromApi(): void {
    this.apiService.getAllSales().subscribe(
      response => {
        this.sales = response;
      },
      error => {
        console.error(error);
      }
    );
  }

  getSalaByOficina(pais: string, ciutat: string, nomOficina: string): void {
    this.apiService.getSalaByOficina(pais, ciutat, nomOficina).subscribe(
      response => {
        this.sales = response;
      },
      error => {
        console.error(error);
      }
    );
  }
}
