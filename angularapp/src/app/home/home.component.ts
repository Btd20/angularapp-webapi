import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { UsuarisService } from '../usuaris.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private apiService: ApiService, private usuarisService: UsuarisService) { }

ngOnInit(): void {
  this.getUsuarisFromApi();
}

getUsuarisFromApi(): void {
  this.usuarisService.getUsuaris().subscribe(
    response => {
    },
    error => {
      console.error(error);
    }
  );
}
}
