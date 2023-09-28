import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class GeoIpService {
  private apiUrl = 'http://ip-api.com/json/'; 

  constructor(private http: HttpClient) { }

  // Exemple de mètode per fer una crida GET
  getData(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`);
  }
}
