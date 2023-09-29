import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  private apiUrlSales = 'https://localhost:7240/Sales';
  constructor(private http: HttpClient) { }


  getAllSales() {
    return this.http.get<any[]>(this.apiUrlSales);
  }

  createSalesByNom(nomPais: string, nomCiutat: string, nomOficina: string, nomSala: string): Observable<any> {
    const url = `${this.apiUrlSales}/Pais/${nomPais}/Ciutats/${nomCiutat}/Oficines/${nomOficina}/Sales/${nomSala}`;
    return this.http.post(url, {});
  }

  deleteSalesByNom(nomSala: string): Observable<any> {
    const url = `${this.apiUrlSales}/nom/${nomSala}`;
    return this.http.delete(url);
  }

  updateSala(sala: any): Observable<any> {
    const url = `${this.apiUrlSales}/${sala.meetingRoomID}`;
    return this.http.put(url, sala);
  }

}
