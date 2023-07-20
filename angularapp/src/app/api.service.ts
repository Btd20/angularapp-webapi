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
        const currentUser = usuaris.find(usuario => usuario.userName === localStorage.getItem('username'));
        if (currentUser) {
          localStorage.setItem('email', currentUser.email);
        }
      })
    );
  }

  actualitzarUsuari(usuario: any): Observable<any> {
    const url = `${this.apiUrlUsuaris}/${usuario.id}`;
    return this.http.put(url, usuario);
  }
  // CRUD PAISOS //

  createPais(pais: any): Observable<any> {
    return this.http.post<any>(this.apiUrlPaisos, pais);
  }

  updatePais(id: number, pais: any): Observable<any> {
    const url = `${this.apiUrlPaisos}/${id}`;
    return this.http.put<any>(url, pais);
  }

  deletePaisByNom(nomPais: string): Observable<any> {
    const url = `${this.apiUrlPaisos}/nom/${nomPais}`;
    return this.http.delete(url);
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


  updateCiutats(id: number, ciutat: any): Observable<any> {
    const url = `${this.apiUrlCiutats}/${id}`;
    return this.http.put<any>(url, ciutat);
  }

  deleteCiutatsByNom(nomCiutat: string): Observable<any> {
    const url = `${this.apiUrlCiutats}/nom/${nomCiutat}`;
    return this.http.delete(url);
  }




  // CRUD OFICINES
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
}
