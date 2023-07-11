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
    this.msgLogin = "No s'ha pogut logejar. Revisa el nom d'usuari o la contrasenya.";
  }

  errorLogin() {
    const errorLogin = document.getElementById('errorLogin');
    if (errorLogin != null) {
      errorLogin.style.display = 'block';
    }
  }

  sucessLogin() {
    const succesLogin = document.getElementById('succesLogin');
    if (succesLogin != null) {
      succesLogin.style.display = 'block';
    }
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
        this.router.navigate(['/home']);
      },
      error => {
        console.log('Error en el inicio de sesión:', error);

      }
    );

  }

  @Output() goBackEvent = new EventEmitter<void>();

  goBack() {
    this.goBackEvent.emit();
    this.router.navigate(['/']);
  }

}

