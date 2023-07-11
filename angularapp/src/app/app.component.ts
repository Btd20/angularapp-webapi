import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showLoginForm: boolean = false;
  showRegisterForm: boolean = false;
  userLoggedIn: boolean = false;
    title: any;

  constructor(private router: Router) { }



  goBack() {
    this.showLoginForm = false;
    this.showRegisterForm = false;
    this.userLoggedIn = false;
    this.router.navigate(['/']);
  }

  setUserLoggedIn(loggedIn: boolean) {
    this.userLoggedIn = loggedIn;
    this.router.navigate(['/home']);
  }
  
}


