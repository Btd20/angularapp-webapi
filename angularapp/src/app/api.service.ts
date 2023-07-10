import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://localhost:7240/Pais';

  constructor(private http: HttpClient) { }

  getPaisos() {
    return this.http.get<any[]>(this.apiUrl);
  }
}
