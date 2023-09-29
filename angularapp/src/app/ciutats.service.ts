import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CiutatsService {

  private apiUrlCiutats = 'https://localhost:7240/Ciutats';
  constructor(private http: HttpClient) { }

  getCiutatsByPais(pais: string) {
    const url = `${this.apiUrlCiutats}/pais/${pais}`;
    return this.http.get<any[]>(url);
  }

  getAllCiutats() {
    return this.http.get<any[]>(this.apiUrlCiutats);
  }

  getOficinesByCiutats(nomPais: string, nomCiutat: string) {
    const url = `${this.apiUrlCiutats}/pais/${nomPais}/ciutats/${nomCiutat}/oficines`;
    return this.http.get<any[]>(url);
  }

  createCiutatsByName(nomPais: string, nomCiutat: string): Observable<any> {
    const url = `${this.apiUrlCiutats}/${nomCiutat}?nomPais=${nomPais}`;
    return this.http.post<any>(url, {});
  }

  updateCiutat(ciutat: any): Observable<any> {
    const url = `${this.apiUrlCiutats}/${ciutat.cityID}`;
    return this.http.put(url, ciutat);
  }

  deleteCiutatsByNom(nomCiutat: string): Observable<any> {
    const url = `${this.apiUrlCiutats}/nom/${nomCiutat}`;
    return this.http.delete(url);
  }

}
