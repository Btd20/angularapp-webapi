import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OficinesService {

 // private apiUrlOficines = 'https://localhost:7240/Oficines';
  private apiUrlOficines = 'https://localhost:7276/Oficines';
  
  constructor( private http: HttpClient) { }

  getAllOficines() {

    return this.http.get<any[]>(this.apiUrlOficines);
  }


  createOficinesByNom(nomPais: string, nomCiutat: string, nomOficina: string): Observable<any> {
    const url = `${this.apiUrlOficines}/Pais/${nomPais}/Ciutats/${nomCiutat}/Oficines/${nomOficina}`;
    return this.http.post(url, {});
  }

  updateOficina(oficina: any): Observable<any> {
    const url = `${this.apiUrlOficines}/${oficina.officeID}`;
    return this.http.put(url, oficina);
  }

  deleteOficinesByNom(nomOficina: string): Observable<any> {
    const url = `${this.apiUrlOficines}/nom/${nomOficina}`;
    return this.http.delete(url);
  }

  getGeolocationByOficinaId(oficinaId: number): Observable<any> {
    const url = `${this.apiUrlOficines}/${oficinaId}`;
    return this.http.get<any>(url);
  }

}
