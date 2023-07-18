import { Component } from '@angular/core';
import { AuthService } from '../auth-service.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  constructor(private authService: AuthService) { }

  changePassword() {
    if (this.newPassword !== this.confirmPassword) {
      // Mostrar un mensaje de error indicando que las contraseñas no coinciden
      return;
    }

    this.authService.changePassword(this.currentPassword, this.newPassword)
      .subscribe(() => {
        console.log('Contrassenya canviada.');
      }, error => {
        console.log('Error en el canvi de contrasenya: ', error);
      });
  }
}
