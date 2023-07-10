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

  constructor(private router: Router) { }


  toggleLoginForm() {
    this.showLoginForm = !this.showLoginForm;
    this.showRegisterForm = false;
    this.userLoggedIn = false;
    this.router.navigate(['/login']);
  }

  toggleRegisterForm() {
    this.showRegisterForm = !this.showRegisterForm;
    this.showLoginForm = false;
    this.userLoggedIn = false;
    this.router.navigate(['/register']);
  }

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


