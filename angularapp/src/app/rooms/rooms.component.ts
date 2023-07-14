import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {
  rooms: any[] = [];


  constructor(private router: Router, private apiService: ApiService) { }

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

