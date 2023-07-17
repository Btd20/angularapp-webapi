import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

/*--COMPONENTS DE NO LOGED USER--*/
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

/*--NAVS--*/
import { NavbarComponent } from './navbar/navbar.component';
import { NavsalesComponent } from './navsales/navsales.component';
import { NavadminComponent } from './navadmin/navadmin.component';

/*--COMPONENTS D'USUARI--*/
import { HomeComponent } from './home/home.component';
import { SalesComponent } from './sales/sales.component';
import { PaisosComponent } from './paisos/paisos.component';
import { CiutatsComponent } from './ciutats/ciutats.component';
import { OficinesComponent } from './oficines/oficines.component';
import { RoomsComponent } from './rooms/rooms.component';
import { ReservesComponent } from './reserves/reserves.component';
import { ProfileComponent } from './profile/profile.component';
import { VistaPaisosComponent } from './vista-paisos/vista-paisos.component';

/*--ADMIN MODIFY COMPONENTS--*/
import { AdminComponent } from './admin/admin.component';
import { AdminMRComponent } from './admin-modifyrooms/admin-modifyrooms.component';
import { AdminMOComponent } from './admin-modifyoficines/admin-modifyoficines.component';
import { AdminMPComponent } from './admin-modifypaisos/admin-modifypaisos.component'; 
import { AdminMCComponent } from './admin-modifyciutats/admin-modifyciutats.component';
import { AdminMRVComponent } from './admin-modifyreserves/admin-modifyreserves.component';




@NgModule({
  declarations: [
    AppComponent,

    /*--COMPONENTS DE NO LOGED USER--*/
    IndexComponent,
    LoginComponent,
    RegisterComponent,

    /*--NAVS--*/
    NavbarComponent,
    NavsalesComponent,
    NavadminComponent,

    /*--COMPONENTS D'USUARI--*/
    HomeComponent,
    SalesComponent,
    PaisosComponent,
    CiutatsComponent,
    OficinesComponent,
    RoomsComponent,
    ProfileComponent,
    ReservesComponent,
    VistaPaisosComponent,

    /*--ADMIN MODIFY COMPONENTS--*/
    AdminComponent,
    AdminMRComponent,
    AdminMOComponent,
    AdminMPComponent,
    AdminMCComponent,
    AdminMRVComponent

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
