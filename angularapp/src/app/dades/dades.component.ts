import { Component } from '@angular/core';
import { AuthService } from '../auth-service.service';

@Component({
  selector: 'app-dades',
  templateUrl: './dades.component.html',
  styleUrls: ['./dades.component.css']
})
export class DadesComponent {

  constructor(private authService: AuthService) { }

}
