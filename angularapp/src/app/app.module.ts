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
import { CiutatsComponent } from './ciutats/ciutats.component';
import { NavbarComponent } from './navbar/navbar.component';
import { OficinesComponent } from './oficines/oficines.component';
import { RoomsComponent } from './rooms/rooms.component';
import { AdminComponent } from './admin/admin.component';
import { AdminMRComponent } from './admin-modifyrooms/admin-modifyrooms.component';
import { ProfileComponent } from './profile/profile.component';
import { NavsalesComponent } from './navsales/navsales.component';
import { ReservesComponent } from './reserves/reserves.component';




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
    CiutatsComponent,
    NavbarComponent,
    OficinesComponent,
    RoomsComponent,
    AdminComponent,
    AdminMRComponent,
    ProfileComponent,
    NavsalesComponent,
    ReservesComponent
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
