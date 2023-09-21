import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

/*--COMPONENTS DE NO LOGED USER--*/
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

/*--NAVS--*/
import { NavbarComponent } from './navbar/navbar.component';
import { NavsalesComponent } from './navsales/navsales.component';
import { NavadminComponent } from './navadmin/navadmin.component';
import { NavprofileComponent } from './navprofile/navprofile.component';

/*--COMPONENTS D'USUARI--*/
import { HomeComponent } from './home/home.component';
import { SalesComponent } from './sales/sales.component';
import { PaisosComponent } from './paisos/paisos.component';
import { CiutatsComponent } from './ciutats/ciutats.component';
import { OficinesComponent } from './oficines/oficines.component';
import { ReservesComponent } from './reserves/reserves.component';
import { FerReservaComponent } from './fer-reserva/fer-reserva.component';
import { ProfileComponent } from './profile/profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ChangeUserComponent } from './change-user/change-user.component';
import { ChangeEmailComponent } from './change-email/change-email.component';
import { DadesComponent } from './dades/dades.component';
import { UbicacioComponent } from './ubicacio/ubicacio.component';

import { VistaReservaPais } from './vista-reserva-pais/vista-reserva-pais.component';
import { VistaReservaCiutat } from './vista-reserva-ciutat/vista-reserva-ciutat.component';
import { VistaReservaOficina } from './vista-reserva-oficina/vista-reserva-oficina.component';

/*--ADMIN MODIFY COMPONENTS--*/
import { AdminComponent } from './admin/admin.component';
import { AdminMRComponent } from './admin-modifyrooms/admin-modifyrooms.component';
import { AdminMOComponent } from './admin-modifyoficines/admin-modifyoficines.component';
import { AdminMPComponent } from './admin-modifypaisos/admin-modifypaisos.component'; 
import { AdminMCComponent } from './admin-modifyciutats/admin-modifyciutats.component';
import { AdminMRVComponent } from './admin-modifyreserves/admin-modifyreserves.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/*--RESERVA COMPONENTS--*/
import { ReservaBoxComponent } from './reserva-box/reserva-box.component';
import { ReservaMComponent } from './reserva-modify/reserva-modify.component';


/*--COMPONENTS CRUD--*/
import { CreateCiutatComponent } from './create-ciutat/create-ciutat.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CreatePaisComponent } from './create-pais/create-pais.component';
import { UpdatePaisComponent } from './update-pais/update-pais.component';
import { CreateOficinesComponent } from './create-oficines/create-oficines.component';
import { CreateSalesComponent } from './create-sales/create-sales.component';
import { UpdateCiutatComponent } from './update-ciutat/update-ciutat.component';
import { UpdateOficinaComponent } from './update-oficina/update-oficina.component';
import { UpdateSalaComponent } from './update-sala/update-sala.component';


import { DatePipe } from '@angular/common';
import { SelectSala } from './select-sala/select-sala.component';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { CreateReservaComponent } from './create-reserva/create-reserva.component';
import { UpdateReservaComponent } from './update-reserva/update-reserva.component';


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
    NavprofileComponent,

    /*--COMPONENTS D'USUARI--*/
    HomeComponent,
    SalesComponent,
    PaisosComponent,
    CiutatsComponent,
    OficinesComponent,
    ProfileComponent,
    ReservesComponent,
    FerReservaComponent,
    UbicacioComponent,

    /*--ADMIN MODIFY COMPONENTS--*/
    AdminComponent,
    AdminMRComponent,
    AdminMOComponent,
    AdminMPComponent,
    AdminMCComponent,
    AdminMRVComponent,
    DadesComponent,
    ChangePasswordComponent,
    ChangeUserComponent,
    ChangeEmailComponent,

    ReservaBoxComponent,
    ReservaMComponent,
    CreateCiutatComponent,
    CreatePaisComponent,
    UpdatePaisComponent,
    CreateOficinesComponent,
    CreateSalesComponent,
    UpdateCiutatComponent,
    UpdateOficinaComponent,
    UpdateSalaComponent,
    SelectSala,

    VistaReservaPais,
    VistaReservaCiutat,
    VistaReservaOficina,
    CreateReservaComponent,
    UpdateReservaComponent

  ],
  imports: [ 
    BrowserModule, HttpClientModule,
    FormsModule, 
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule,
    MatAutocompleteModule
   

  ],

  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
