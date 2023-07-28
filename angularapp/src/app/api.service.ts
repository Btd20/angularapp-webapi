import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrlPaisos = 'https://localhost:7240/Pais';
  private apiUrlCiutats = 'https://localhost:7240/Ciutats';
  private apiUrlSales = 'https://localhost:7240/Sales';
  private apiUrlOficines = 'https://localhost:7240/Oficines';
  private apiUrlUsuaris = 'https://localhost:7240/api/ApplicationUsers';
  private apiUrlReserves = 'https://localhost:7240';

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
  getAllSales() {
    return this.http.get<any[]>(this.apiUrlSales);
  }

  getSalaByOficina(pais: string, ciutat: string, nomOficina: string) {
    const url = `https://localhost:7240/Oficines/pais/${pais}/ciutats/${ciutat}/oficines/${nomOficina}/sales`;
    return this.http.get<any[]>(url);
  }



  getOficinesByCiutats(nomPais: string, nomCiutat: string) {
    const url = `${this.apiUrlCiutats}/pais/${nomPais}/ciutats/${nomCiutat}/oficines`;
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
  // CRUD PAISOS //

  createPais(pais: any): Observable<any> {
    return this.http.post<any>(this.apiUrlPaisos, pais);
  }


  deletePaisByNom(nomPais: string): Observable<any> {
    const url = `${this.apiUrlPaisos}/nom/${nomPais}`;
    return this.http.delete(url);
  }

  updatePais(pais: any): Observable<any> {
    const url = `${this.apiUrlPaisos}/${pais.countryID}`; 
    return this.http.put(url, pais);
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


  // CRUD CIUTATS

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


  // CRUD OFICINES

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

  CreateReserva(meetingRoomID: number, dataReserva: string, horaInici: string, horaFi: string): Observable<any> {
    const url = `${this.apiUrlReserves}/FerReserva`; //arreclar ruta sisi ouh yeah
    const body = {
      meetingRoomID: meetingRoomID, 
      dataReserva: dataReserva,
      horaInici: horaInici,
      horaFi: horaFi
    };
    return this.http.post<any>(url, body);
  }

}
