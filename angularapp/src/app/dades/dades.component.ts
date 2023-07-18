import { Component } from '@angular/core';
import { AuthService } from '../auth-service.service';

@Component({
  selector: 'app-dades',
  templateUrl: './dades.component.html',
  styleUrls: ['./dades.component.css']
})
export class DadesComponent {
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
