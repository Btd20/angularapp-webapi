import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { AuthService } from '../auth-service.service';

@Component({
  selector: 'app-reserves',
  templateUrl: './reserves.component.html',
  styleUrls: ['./reserves.component.css']
})
export class ReservesComponent implements OnInit {
  reserves: any[] = [];
  

  constructor(private apiService: ApiService,
    private router: Router, private authService: AuthService) {
  }

  ngOnInit(): void {
    const userId = sessionStorage.getItem('id');

    if (userId !== null) {
      this.apiService.getReservesByUser(userId)
        .subscribe(reservas => {
          this.reserves = reservas;
        });
    }
  }

  /*getAllReservesFromApi(): void {
    this.apiService.getAllReserves().subscribe(
      response => {
        this.reserves = response;
      },
      error => {
        console.error(error);
      }
    );
  }*/
}
