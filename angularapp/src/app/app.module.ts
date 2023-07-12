import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { VistaPaisosComponent } from './vista-paisos/vista-paisos.component';
import { HomeComponent } from './home/home.component';
import { IndexComponent } from './index/index.component';
import { SalesComponent } from './sales/sales.component';
import { PaisosComponent } from './paisos/paisos.component';
import { NavbarComponent } from './navbar/navbar.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    VistaPaisosComponent,
    HomeComponent,
    IndexComponent,
    SalesComponent,
    PaisosComponent,
    NavbarComponent
  ],
  imports: [ 
    BrowserModule, HttpClientModule,
    FormsModule, 
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
