import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { PaisosService } from './paisos.service';
import { CiutatsService } from './ciutats.service';
import { OficinesService } from './oficines.service';
import { ReservesService } from './reserves.service';
import { UsuarisService } from './usuaris.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  

  constructor(
    private http: HttpClient,
    private paisosService: PaisosService,
    private ciutatsService: CiutatsService,
    private oficinesService: OficinesService,
    private reservesService: ReservesService,
    private usuarisService: UsuarisService

  ) { }



  getSalaByOficina(pais: string, ciutat: string, nomOficina: string) {
    const url = `https://localhost:7240/Oficines/pais/${pais}/ciutats/${ciutat}/oficines/${nomOficina}/sales`;
    return this.http.get<any[]>(url);
  }



}
