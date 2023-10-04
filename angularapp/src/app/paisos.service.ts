import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaisosService {

  //private apiUrlPaisos = 'https://localhost:7240/Pais
  private apiUrlPaisos = 'https://localhost:7246/Pais';
  constructor(private http: HttpClient) { }

  getPaisos() {
    return this.http.get<any[]>(this.apiUrlPaisos);
  }

  // CRUD PAISOS //

  createPais(pais: any): Observable<any> {
    return this.http.post<any>(this.apiUrlPaisos, pais);
  }


  deletePaisByNom(nomPais: string): Observable<any> {
    const url = `${this.apiUrlPaisos}/nom/${nomPais}`;
    return this.http.delete(url);
  }

  updatePais(pais: any): Observable<any> {
    const url = `${this.apiUrlPaisos}/${pais.countryID}`;
    return this.http.put(url, pais);
  }
}
