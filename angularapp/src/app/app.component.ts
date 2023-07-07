import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showLoginForm: boolean = false;
  showRegisterForm: boolean = false;

  toggleLoginForm() {
    this.showLoginForm = !this.showLoginForm;
    this.showRegisterForm = false;
  }

  toggleRegisterForm() {
    this.showRegisterForm = !this.showRegisterForm;
    this.showLoginForm = false;
  }

  goBack() {
    this.showLoginForm = false;
    this.showRegisterForm = false;
  }
} 

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}


