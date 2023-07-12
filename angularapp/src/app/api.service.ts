import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrlPaisos = 'https://localhost:7240/Pais';
  private apiUrlCiutats = 'https://localhost:7240/Ciutats';
  private apiUrlRooms = 'https://localhost:7240/Sales';
  private apiUrlOficines = 'https://localhost:7240/Oficines';

  constructor(private http: HttpClient) { }

  getPaisos() {
    return this.http.get<any[]>(this.apiUrlPaisos);
  }

  getCiutats() {
    return this.http.get<any[]>(this.apiUrlCiutats);
  }

  getCiutatsByPais(pais: string) {
    const url = `${this.apiUrlCiutats}/pais/${pais}`;
    return this.http.get<any[]>(url);
  }

  getRooms() {
    return this.http.get<any[]>(this.apiUrlRooms);
  }

  getOficines() {
    return this.http.get<any[]>(this.apiUrlOficines);
  }

}
