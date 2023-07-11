import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrlPaisos = 'https://localhost:7240/Pais';
  private apiUrlCiutats = 'https://localhist:7240/Ciutats';

  constructor(private http: HttpClient) { }

  getPaisos() {
    return this.http.get<any[]>(this.apiUrlPaisos);
  }

  getCiutats() {
    return this.http.get<any[]>(this.apiUrlCiutats); // Pati: Has d'implementar aquesta funció a Ciutats component
  }
}
