import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent {
  Username: string | undefined;
  Password: string | undefined;
  RememberMe: boolean | undefined;

  constructor(private http: HttpClient, private router: Router) { }

  login() {
    const Username = encodeURIComponent(this.Username || '');
    const Password = encodeURIComponent(this.Password || '');
    const RememberMe = this.RememberMe || false;

    const url = `https://localhost:7240/Auth/login`;
    const body = {
      Username: Username,
      Password: Password,
      RememberMe: RememberMe
    };

    this.http.post(url, body).subscribe(
      response => {
        console.log('Login exitoso:', response);
        this.router.navigate(['/']); // Redirige a la página principal (AppComponent)
      },
      error => {
        console.log('Error en el inicio de sesión:', error);
      }
    );
  }
}
