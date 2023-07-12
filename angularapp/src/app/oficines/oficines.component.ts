import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-oficines',
  templateUrl: './oficines.component.html',
  styleUrls: ['./oficines.component.css']
})
export class OficinesComponent implements OnInit {
  oficines: any[] = [];


  constructor(private router: Router, private apiService: ApiService) { }

  ngOnInit(): void {
    this.getOficinesFromApi();
  }

  getOficinesFromApi(): void {
    this.apiService.getOficines().subscribe(
      response => {
        this.oficines = response;
      },
      error => {
        console.error(error);
      }
    );
  }


}
