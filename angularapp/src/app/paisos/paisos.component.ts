import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth-service.service';
import { PaisosService } from '../paisos.service';

@Component({
  selector: 'app-paisos',
  templateUrl: './paisos.component.html',
  styleUrls: ['./paisos.component.css']
})
export class PaisosComponent implements OnInit {
  paisos: any[] = [];
  isAdmin?: boolean;


  constructor(private paisosService: PaisosService, 
    private router: Router, private authService: AuthService) {
    this.isAdmin = authService.isAdmin;
  }

  ngOnInit(): void {
    this.getPaisosFromApi();
  }

  getPaisosFromApi(): void {
    this.paisosService.getPaisos().subscribe(
      response => {
        this.paisos = response;
      },
      error => {
        console.error(error);
      }
    );
  }

  mostrarCiutats(pais: any): void {
    this.router.navigate(['/ciutats', pais.nomPais]);
  }
}
