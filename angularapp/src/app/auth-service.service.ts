import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string | null = null;

  constructor(private http: HttpClient, private router: Router) { }

  login(username: string, password: string): Observable<any> {
    const body = {
      Username: username,
      Password: password
    };

    return this.http.post<any>('https://localhost:7240/Auth/login', body);
  }

  setToken(token: string): void {
    this.token = token;
  }

  getToken(): string | null {
    return this.token;
  }

  isAuthenticated(): boolean {
    return this.token !== null;
  }

  isTokenValid(): Observable<boolean | null> {
    if (this.token) {
      const tokenExpirationDate = this.getTokenExpirationDate(this.token);
      const isTokenValid = tokenExpirationDate && tokenExpirationDate > new Date();
      return of(isTokenValid);
    }

    return of(null);
  }

  logout(): void {
    this.token = null;
  }

  private getTokenExpirationDate(token: string): Date | null {
    // Agrega aquí la lógica para obtener la fecha de expiración del token
    // Puedes utilizar una biblioteca como 'jwt-decode' para decodificar el token y obtener la fecha de expiración

    // Ejemplo: Decodificar el token JWT para obtener la fecha de expiración
    const tokenParts = token.split('.');
    if (tokenParts.length === 3) {
      const payload = JSON.parse(atob(tokenParts[1]));
      if (payload && payload.exp) {
        const expirationDate = new Date(0);
        expirationDate.setUTCSeconds(payload.exp);
        return expirationDate;
      }
    }

    return null;
  }

  checkTokenAndRedirect(): void {
    if (this.isAuthenticated()) {
      this.isTokenValid().subscribe(isValid => {
        if (isValid) {
          this.router.navigate(['/home']);
        }
      });
    }
  }
}
