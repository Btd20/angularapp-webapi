import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { AuthService } from '../auth-service.service';



@Component({
  selector: 'app-admin-modifyreserves',
  templateUrl: 'admin-modifyreserves.component.html',
  styleUrls: ['admin-modifyreserves.component.css']
})
export class AdminMRVComponent implements OnInit {
  reserves: any[] = [];
  isAdmin?: boolean;
  currentPage: number = 1;
  pageSize: number = 5;

  constructor(private apiService: ApiService, private authService: AuthService) {
    this.isAdmin = authService.isAdmin;
  }

  ngOnInit(): void {
    this.getAllReservesFromApi();
  }

  getAllReservesFromApi(): void {
    this.apiService.getAllReserves().subscribe(
      response => {
        this.reserves = response;
      },
      error => {
        console.error(error);
      }
    );
  }

  formatTimeSpan(timeSpan: string): string {
    const parts = timeSpan.split(':');
    const hours = parts[0];
    const minutes = parts[1];
    return `${hours}:${minutes}`;
  }

 
  get totalPages(): number {
    return Math.ceil(this.reserves.length / this.pageSize); // Total de páginas
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
