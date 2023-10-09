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
      console.log('Les contrasenyes no coincideixen.')
      alert('✘ Les contrasenyes no coincideixen.');
      return;
    }

    this.authService.changePassword(this.currentPassword, this.newPassword)
      .subscribe(() => {
        console.log('Contrasenya canviada.');
        alert('✔ Contrasenya canviada correctament.');
      }, error => {
        console.log('Error en el canvi de contrasenya: ', error);
        alert('✘ Error en el canvi de contrasenya.');
      });
  }
}
