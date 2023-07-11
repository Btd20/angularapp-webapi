import { Component, EventEmitter, Output } from '@angular/core';
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

  @Output() loggedInEvent = new EventEmitter<boolean>();
  constructor(private http: HttpClient, private router: Router) { }

  msgLogin="";

  showMessage() {
    this.msgLogin = "Hi ha hagut un error de connexió. Revisa el nom d'usuari o la contrasenya";
  }

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
        this.loggedInEvent.emit(true); //això fa que loggedIn sigui true i per tant es mostri el HOME
      },
      error => {
        console.log('Error en el inicio de sesión:', error);
      }
    );

  }

  @Output() goBackEvent = new EventEmitter<void>();

  goBack() {
    this.goBackEvent.emit();
  }

}

