import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/*--COMPONENTS DE NO LOGED USER--*/
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

/*--COMPONENTS D'USUARI--*/
import { HomeComponent } from './home/home.component';
import { SalesComponent } from './sales/sales.component';
import { PaisosComponent } from './paisos/paisos.component';
import { CiutatsComponent } from './ciutats/ciutats.component';
import { OficinesComponent } from './oficines/oficines.component';
import { ReservesComponent } from './reserves/reserves.component';
import { FerReservaComponent } from './fer-reserva/fer-reserva.component';
import { ReservaMComponent } from './reserva-modify/reserva-modify.component';
import { ProfileComponent } from './profile/profile.component';
import { DadesComponent } from './dades/dades.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ChangeUserComponent } from './change-user/change-user.component';
import { ChangeEmailComponent } from './change-email/change-email.component';
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

const routes: Routes = [
  { path: 'reserves', component: ReservesComponent },
  /*--AQUESTES RUTES HAURIEN DE SER X CADA SALA. amb aixo de ferreserva/:nomSala--*/
  { path: 'ferreserva', component: FerReservaComponent },
  { path: 'reserva-modify', component: ReservaMComponent },
  { path: 'modify-reserves/:reservaId', component: ReservaMComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'admin-modifyrooms', component: AdminMRComponent },
  { path: 'admin-modifyoficines', component: AdminMOComponent },
  { path: 'admin-modifypaisos', component: AdminMPComponent },
  { path: 'admin-modifyciutats', component: AdminMCComponent },
  { path: 'admin-modifyreserves', component: AdminMRVComponent },
  { path: 'admin-ciutats', component: AdminMCComponent },
  { path: 'sales', component: SalesComponent },
  { path: 'ciutats', component: CiutatsComponent },
  { path: 'oficines', component: OficinesComponent },
  { path: 'oficines/:pais/:ciutat/:oficina/sales', component: SalesComponent },
  { path: 'ferreserva/:pais/:ciutat/:oficina', component: FerReservaComponent },
  { path: 'ciutats/:pais/oficines/:ciutat', component: OficinesComponent },
  { path: 'ciutats/:pais', component: CiutatsComponent },
  { path: 'paisos', component: PaisosComponent },
  { path: 'Pais/nom/:nomPais', component: PaisosComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'settings-user', component: DadesComponent },
  { path: 'change-password', component: ChangePasswordComponent },
  { path: 'change-user', component: ChangeUserComponent },
  { path: 'change-email', component: ChangeEmailComponent },
  { path: 'change-dates', component: UbicacioComponent },
  { path: 'reserves', component: ReservesComponent },
  { path: 'ferreserva/:meetingRoomID/:dataReserva/:horaInici/:horaFi/:userID', component: FerReservaComponent },
  


  { path: 'vista-rpais', component: VistaReservaPais },
  { path: 'vista-rciutat', component: VistaReservaCiutat },
  { path: 'vista-roficina', component: VistaReservaOficina },

  { path: '', component: IndexComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
