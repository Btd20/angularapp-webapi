import { Component } from '@angular/core';
import { AuthService } from '../auth-service.service';

@Component({
  selector: 'app-change-user',
  templateUrl: './change-user.component.html',
  styleUrls: ['./change-user.component.css']
})
export class ChangeUserComponent {
  currentUsername: string = '';
  newUsername: string = '';
  confirmUsername: string = '';

  constructor(private authService: AuthService) { }

  changeUsername() {
    if (this.newUsername !== this.confirmUsername) {
      console.log('Els usuaris no coincideixen.')
      return;
    }

    this.authService.changeUsername(this.currentUsername, this.newUsername)
      .subscribe(() => {
        console.log('Usuari canviat.');
      }, error => {
        console.log('Error en el canvi de usuari: ', error);
      });
  }
}
