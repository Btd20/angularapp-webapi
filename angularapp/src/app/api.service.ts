import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrlPaisos = 'https://localhost:7240/Pais';
  private apiUrlCiutats = 'https://localhost:7240/Ciutats';
  private apiUrlRooms = 'https://localhost:7240/Sales';
  private apiUrlOficines = 'https://localhost:7240/Oficines';
  private apiUrlUsuaris = 'https://localhost:7240/api/ApplicationUsers';
  

  constructor(private http: HttpClient) { }

  getPaisos() {
    return this.http.get<any[]>(this.apiUrlPaisos);
  }

  getAllCiutats() {
    return this.http.get<any[]>(this.apiUrlCiutats);
  }

  getCiutatsByPais(pais: string) {
    const url = `${this.apiUrlCiutats}/pais/${pais}`;
    return this.http.get<any[]>(url);
  }

  getAllOficines() {
    return this.http.get<any[]>(this.apiUrlOficines);
  }

  getOficinesByCiutats(nomPais: string, nomCiutat: string) {
    const url = `${this.apiUrlCiutats}/pais/${nomPais}/ciutats/${nomCiutat}/oficines`;
    return this.http.get<any[]>(url);
  }

  getRooms() {
    return this.http.get<any[]>(this.apiUrlRooms);
  }

  

  getUsuaris() {
    return this.http.get<any[]>(this.apiUrlUsuaris);
  }

  actualitzarUsuari(usuario: any): Observable<any> {
    const url = `${this.apiUrlUsuaris}/${usuario.id}`;
    return this.http.put(url, usuario);
  }

}
