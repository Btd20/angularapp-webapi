import { Component, EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, RouterOutlet } from '@angular/router';
import { AlertComponent } from '../alert/alert.component';
import { AlertService } from '../alert/services/alert.service';
import { AlertTypeEnum } from '../alert/types/alertType.enum';


interface RegisterData {
  username: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-register',
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.css'],
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string | undefined;

  AlertComponent?: AlertComponent;
  alertTypes = AlertTypeEnum;


  constructor(private http: HttpClient, private router: Router,
    private alertService: AlertService) {}

  showAlert(type: AlertTypeEnum) {
    this.alertService.setAlert({
      type,
      text: 'Our test'
    });
  }


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
        this.showAlert(this.alertTypes.success);
        alert('Registrat amb exit');
        this.router.navigate(['/login']);
        //this.showSuccess();
      },
      error => {
        this.errorMessage = 'Error en el registro. Verifica los datos ingresados.';
        console.error('Error en el registro:', error);
        this.showAlert(this.alertTypes.warning);
        alert('Error en el registre');
        //this.showError();
      }
    );
  }

  @Output() goBackEvent = new EventEmitter<void>();

  goBack() {
    this.goBackEvent.emit();
    this.router.navigate(["/"]);
  }
}
