import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservesService {

  private apiUrlReserves = 'https://localhost:7240/Reserves';
  constructor(private http: HttpClient) { }

  getAllReserves() {
    return this.http.get<any[]>(this.apiUrlReserves);
  }

  // CRUD RESERVES

  CreateReserva(meetingRoomID: number, dataReserva: string, horaInici: string, horaFi: string, userId: string): Observable<any> {
    const url = `${this.apiUrlReserves}/FerReserva/${meetingRoomID}/${dataReserva}/${horaInici}/${horaFi}/${userId}`;
    return this.http.post<any>(url, {});
  }

  eliminarReserva(id: string): Observable<any> {
    const url = `${this.apiUrlReserves}/${id}`;
    return this.http.delete(url);
  }

  getReservesByUser(userId: string) {
    const url = `${this.apiUrlReserves}/GetReservesByUser/${userId}`;
    return this.http.get<any[]>(url);
  }

  getReserve(reserveId: number): Observable<any> {
    const url = `${this.apiUrlReserves}/${reserveId}`;
    return this.http.get<any>(url);
  }

  updateReserva(id: number, novaHoraInici: string, novaHoraFi: string, novaDataReserva: string): Observable<any> {
    const url = `${this.apiUrlReserves}/${id}/${novaHoraInici}/${novaHoraFi}/${novaDataReserva}`;
    return this.http.put(url, null);
  }
}
