import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth-service.service';

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

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.authService.isTokenValid().subscribe(isValid => {
        if (isValid) {
          this.router.navigate(['https://localhost:4200/home']);
        }
      });
    }
  }

  msgLogin = '';

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
    const username = encodeURIComponent(this.Username || '');
    const password = encodeURIComponent(this.Password || '');
    const rememberMe = this.RememberMe || false;

    this.authService.login(username, password).subscribe(
      response => {
        this.authService.setToken(response.token);
        console.log('Login exitoso');
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
