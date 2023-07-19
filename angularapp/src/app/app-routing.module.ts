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
import { ProfileConfigComponent } from './profile-config/profile-config.component';
import { DadesComponent } from './dades/dades.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ChangeUserComponent } from './change-user/change-user.component';
import { ChangeEmailComponent } from './change-email/change-email.component';
import { UbicacioComponent } from './ubicacio/ubicacio.component';

/*--ADMIN MODIFY COMPONENTS--*/
import { AdminComponent } from './admin/admin.component';
import { AdminMRComponent } from './admin-modifyrooms/admin-modifyrooms.component';
import { AdminMOComponent } from './admin-modifyoficines/admin-modifyoficines.component';
import { AdminMPComponent } from './admin-modifypaisos/admin-modifypaisos.component';
import { AdminMCComponent } from './admin-modifyciutats/admin-modifyciutats.component';
import { AdminMRVComponent } from './admin-modifyreserves/admin-modifyreserves.component';

const routes: Routes = [
  { path: 'reserves', component: ReservesComponent },
  { path: 'reserves/:nomSala', component: ReservesComponent },
  { path: 'ferreserva', component: FerReservaComponent },
  { path: 'reserva-modify/:nomSala', component: ReservaMComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'admin-modifyrooms', component: AdminMRComponent },
  { path: 'admin-modifyoficines', component: AdminMOComponent },
  { path: 'admin-modifypaisos', component: AdminMPComponent },
  { path: 'admin-modifyciutats', component: AdminMCComponent },
  { path: 'admin-modifyreserves', component: AdminMRVComponent },
  { path: 'sales', component: SalesComponent },
  { path: 'ciutats', component: CiutatsComponent },
  { path: 'oficines', component: OficinesComponent },
  { path: 'oficines/:pais/:ciutat/:oficina/sales', component: SalesComponent },
  { path: 'ciutats/:pais/oficines/:ciutat', component: OficinesComponent },
  { path: 'ciutats/:pais', component: CiutatsComponent },
  { path: 'paisos', component: PaisosComponent },
  { path: 'Pais/nom/:nomPais', component: PaisosComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'profile-config', component: ProfileConfigComponent },
  { path: 'dades', component: DadesComponent },
  { path: 'change-password', component: ChangePasswordComponent },
  { path: 'change-user', component: ChangeUserComponent },
  { path: 'change-email', component: ChangeEmailComponent },
  { path: 'ubicacio', component: UbicacioComponent },
  { path: '', component: IndexComponent }, 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
