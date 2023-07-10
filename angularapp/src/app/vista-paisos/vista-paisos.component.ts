import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-vista-paisos',
  templateUrl: 'vista-paisos.component.html',
  styleUrls: ['vista-paisos.component.css']
})
export class VistaPaisosComponent implements OnInit {
  datos!: any[];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getDatosFromApi();
  }

  getDatosFromApi(): void {
    this.apiService.getPaisos().subscribe(
      response => {
        console.log(response); // Imprime la respuesta en la consola para verificar su estructura
        this.datos = response; // Almacena los datos de la respuesta en la propiedad 'datos'
      },
      error => {
        console.error(error); // Maneja cualquier error de la llamada a la API
      }
    );
  }
}

