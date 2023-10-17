import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { AuthService } from '../auth-service.service';
import { SalesService } from '../sales.service';

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
  officeID: number=-1;


  constructor(private router: Router, private route: ActivatedRoute,
    private apiService: ApiService, private authService: AuthService,
    private salesService: SalesService
  ) {
    this.isAdmin = authService.isAdmin;
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.pais = params['pais'];
      this.ciutat = params['ciutat'];
      this.oficina = params['oficina'];
      this.officeID = +params['officeID'];  //el + transforma el paràmetre a número perque els paràmetres es passen com a string

      if (this.officeID) {
        this.getSalesByOfficeID(this.officeID);
      } else {
        this.getAllSalesFromApi();
      }

      //alert(`${this.pais}    ${this.ciutat}   ${this.oficina}`);

      
      //if (this.pais && this.ciutat && this.oficina) {
      //  this.getSalaByOficina(this.pais, this.ciutat, this.oficina);
      //} else {
      //  this.getAllSalesFromApi();
      //}
    });
  }

  getAllSalesFromApi(): void {
    this.salesService.getAllSales().subscribe(
      response => {
        this.sales = response;
      },
      error => {
        console.error(error);
      }
    );
  }

  //              G E T   S A L E S   D E   W E B A P I
  //--------------------------------------------------------------------------
  //getSalaByOficina(pais: string, ciutat: string, nomOficina: string): void {
  //  this.apiService.getSalaByOficina(pais, ciutat, nomOficina).subscribe(
  //    response => {
  //      this.sales = response;
  //    },
  //    error => {
  //      console.error(error);
  //    }
  //  );
  //}


  getSalesByOfficeID(officeID: number): void {
    this.salesService.getSalesByOfficeID(officeID).subscribe(
      response => {
        this.sales = response;
      },
      error => {
        console.error(error);
      }
    );
  }

  

  navigateToFerReserves(salaID: number): void {
    const pais = this.pais;
    const ciutat = this.ciutat;
    const oficina = this.oficina;

    this.router.navigate(['/ferreserva',salaID]);
  }

}
