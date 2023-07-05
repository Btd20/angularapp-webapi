import { Component, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface RegisterData {
  username: string;
  email: string;
  password: string;
}

@Injectable()
@Component({
  selector: 'app-register',
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.css']
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string | undefined;

  constructor(private http: HttpClient) { }

  register() {
    const data: RegisterData = {
      username: this.username,
      email: this.email,
      password: this.password
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    this.http.post('https://localhost:7240/Auth/register', data, { headers }).subscribe(
      response => {
        console.log('Registro exitoso:', response);
      },
      error => {
        this.errorMessage = 'Error en el registro. Verifica los datos ingresados.';
        console.error('Error en el registro:', error);
      }
    );
  }
}
