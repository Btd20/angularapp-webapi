import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string | undefined;
  email: string | undefined;
  password: string | undefined;

  constructor(private http: HttpClient) { }

  register() {
    const data = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      username: this.username,
      email: this.email,
      password: this.password
    };

    this.http.post('http://localhost:7240/Auth/register', data).subscribe(
      response => {
        // Manejar la respuesta exitosa del registro
        console.log('Registro exitoso:', response);
      },
      error => {
        // Manejar el error del registro
        console.error('Error en el registro:', error);
      }
    );
  }
}
