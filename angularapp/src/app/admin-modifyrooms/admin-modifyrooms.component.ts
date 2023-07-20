import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { AuthService } from '../auth-service.service';

@Component({
  selector: 'app-admin-modifyrooms',
  templateUrl: 'admin-modifyrooms.component.html',
  styleUrls: ['admin-modifyrooms.component.css']
})
export class AdminMRComponent implements OnInit {
  sales: any[] = [];
  isAdmin?: boolean;
  currentPage: number = 1;
  pageSize: number = 5;

  constructor(private apiService: ApiService, private authService: AuthService) {
    this.isAdmin = authService.isAdmin;
  }

  ngOnInit(): void {
    this.getSalesFromApi();
  }

  getSalesFromApi(): void {
    this.apiService.getAllSales().subscribe(
      response => {
        this.sales = response;
      },
      error => {
        console.error(error);
      }
    );
  }

  get totalPages(): number {
    return Math.ceil(this.sales.length / this.pageSize); // Total de páginas
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
}
