import { Component } from '@angular/core';
import { AuthService } from '../auth-service.service';

@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.css']
})
export class ChangeEmailComponent {
  currentEmail: string = '';
  newEmail: string = '';
  confirmEmail: string = '';
  constructor(private authService: AuthService) { }

  changeEmail() {
    if (this.newEmail !== this.confirmEmail) {
      console.log('Els correus no coincideixen.')
      return;
    }

    this.authService.changeEmail(this.currentEmail, this.newEmail)
      .subscribe(() => {
        console.log('Correu canviat.');
      }, error => {
        console.log('Error en el canvi de correu: ', error);
      });
  }

}
