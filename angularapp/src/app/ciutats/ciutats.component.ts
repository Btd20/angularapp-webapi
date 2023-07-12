import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-ciutats',
  templateUrl: './ciutats.component.html',
  styleUrls: ['./ciutats.component.css']
})
export class CiutatsComponent implements OnInit {
  ciutats: any[] = [];

  constructor(private route: ActivatedRoute, private apiService: ApiService) { }

  ngOnInit(): void {
    this.getCiutatsFromApi();
  }

  getCiutatsFromApi(): void {
    this.apiService.getCiutats().subscribe(
      response => {
        this.ciutats = response;
      },
      error => {
        console.error(error);
      }
    )
  }
}
