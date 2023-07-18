import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { AuthService } from '../auth-service.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {
  rooms: any[] = [];
  isAdmin?: boolean;

  constructor(private apiService: ApiService, private authService: AuthService) {
    this.isAdmin = authService.isAdmin;
  }

  ngOnInit(): void {
    this.getRoomsFromApi();
  }

  getRoomsFromApi(): void {
    this.apiService.getRooms().subscribe(
      response => {
        this.rooms = response;
        console.log(this.rooms);
      },
      error => {
        console.error(error);
      }
    );
  }

}

