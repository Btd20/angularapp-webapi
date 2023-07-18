import { Component, EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

interface RegisterData {
  username: string;
  email: string;
  password: string;
}

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

  constructor(private http: HttpClient, private router: Router) { }

  showSuccess() {
    //document.getElementById(success - btn)
  };


  showError() {
    //document.getElementById(success - btn)
  };

  isUnchanged = true;

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
        this.showSuccess();
      },
      error => {
        this.errorMessage = 'Error en el registro. Verifica los datos ingresados.';
        console.error('Error en el registro:', error);
        this.showError();
      }
    );
  }

  @Output() goBackEvent = new EventEmitter<void>();

  goBack() {
    this.goBackEvent.emit();
    this.router.navigate(["/"]);
  }
}
