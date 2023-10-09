import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarisService {

  // private apiUrlUsuaris = 'https://localhost:7240/api/ApplicationUsers';
  private apiUrlUsuaris = 'https://localhost:7044/api/ApplicationUsers';
  constructor(private http: HttpClient) { }

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


}


