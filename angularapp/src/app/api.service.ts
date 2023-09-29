import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { PaisosService } from './paisos.service';
import { CiutatsService } from './ciutats.service';
import { OficinesService } from './oficines.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrlSales = 'https://localhost:7240/Sales';
  private apiUrlUsuaris = 'https://localhost:7240/api/ApplicationUsers';
//  private apiUrlReserves = 'https://localhost:7240/Reserves';

  constructor(
    private http: HttpClient,
    private paisosService: PaisosService,
    private ciutatsService: CiutatsService,
    private oficinesService: OficinesService,

  ) { }

  getAllReserves(){
    return this.http.get<any[]>(this.apiUrlReserves);
  }*/

  getAllSales() {
    return this.http.get<any[]>(this.apiUrlSales);
  }

  getSalaByOficina(pais: string, ciutat: string, nomOficina: string) {
    const url = `https://localhost:7240/Oficines/pais/${pais}/ciutats/${ciutat}/oficines/${nomOficina}/sales`;
    return this.http.get<any[]>(url);
  }

  getUsuaris(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlUsuaris).pipe(
      tap((usuaris: any[]) => {
        const currentUser = usuaris.find(usuario => usuario.userName === sessionStorage.getItem('username'));
        if (currentUser) {
          sessionStorage.setItem('id', currentUser.id);
          sessionStorage.setItem('email', currentUser.email);
          if (currentUser.pais == null) {
            sessionStorage.setItem('pais', "No seleccionat");
          } else {
            sessionStorage.setItem('pais', currentUser.pais);
          }
          if (currentUser.ciutat == null) {
            sessionStorage.setItem('ciutat', "No seleccionat");
          } else {
            sessionStorage.setItem('ciutat', currentUser.ciutat);
          }
          if (currentUser.oficina == null) {
            sessionStorage.setItem('oficina', "No seleccionat");
          } else {
            sessionStorage.setItem('oficina', currentUser.oficina)
          }
        }
      })
    );
  }

  eliminarUsuari(id: string): Observable<any> {
    const url = `${this.apiUrlUsuaris}/${id}`;
    return this.http.delete(url);
  }

  actualitzarUsuari(usuario: any): Observable<any> {
    const url = `${this.apiUrlUsuaris}/${usuario.id}`;
    return this.http.put(url, usuario);
  }


  guardarPais(username: string, country: string): void {
    const model = { Username: username, Country: country };

    this.http.post(`${this.apiUrlUsuaris}/AssignCountry`, model).subscribe(
      () => {
        console.log('Pais guardat correctament.');
      },
      (error) => {
        console.error('Error al guardar el pais:', error);
      }
    );
  }

  guardarCiutat(username: string, city: string): void {
    const model = { Username: username, City: city };

    this.http.post(`${this.apiUrlUsuaris}/AssignCity`, model).subscribe(
      () => {
        console.log('Ciutat guardada correctament.');
      },
      (error) => {
        console.error('Error al guardar la ciutat:', error);
      }
    );
  }


  guardarOficina(username: string, office: string): void {
    const model = { Username: username, Office: office };

    this.http.post(`${this.apiUrlUsuaris}/AssignOffice`, model).subscribe(
      () => {
        console.log('Oficina guardada correctamente.');
      },
      (error) => {
        console.error('Error al guardar la oficina:', error);
      }
    );
  }

  // CRUD SALES

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

  // CRUD RESERVES

  /*CreateReserva(meetingRoomID: number, dataReserva: string, horaInici: string, horaFi: string, userId: string): Observable<any> {
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
  }*/
}
