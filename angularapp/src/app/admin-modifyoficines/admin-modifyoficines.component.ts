import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { AuthService } from '../auth-service.service';

@Component({
  selector: 'app-admin-modifyoficines',
  templateUrl: 'admin-modifyoficines.component.html',
  styleUrls: ['admin-modifyoficines.component.css']
})
export class AdminMOComponent implements OnInit {
  oficines: any[] = [];
  isAdmin?: boolean;
  currentPage: number = 1;
  pageSize: number = 5;

  constructor(private apiService: ApiService, private authService: AuthService) {
    this.isAdmin = authService.isAdmin;
  }

  ngOnInit(): void {
    this.getOficinesFromApi();
  }

  getOficinesFromApi(): void {
    this.apiService.getAllOficines().subscribe(
      response => {
        this.oficines = response;
      },
      error => {
        console.error(error);
      }
    );
  }


  get totalPages(): number {
    return Math.ceil(this.oficines.length / this.pageSize);
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
