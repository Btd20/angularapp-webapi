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

const routes: Routes = [
  { path: 'reserves',component: ReservesComponent},
  { path: 'admin', component: AdminComponent },
  { path: 'admin-modifyrooms', component: AdminMRComponent },
  { path: 'admin-modifyoficines', component: AdminMOComponent },
  { path: 'admin-modifypaisos', component: AdminMPComponent },
  { path: 'admin-modifyciutats', component: AdminMCComponent },
  { path: 'rooms', component: RoomsComponent },
  { path: 'ciutats', component: CiutatsComponent },
  { path: 'oficines', component: OficinesComponent },
  { path: 'rooms/:pais/:ciutat/:oficina', component: RoomsComponent },
  { path: 'ciutats/:pais/oficines/:ciutat', component: OficinesComponent },
  { path: 'ciutats/:pais', component: CiutatsComponent},
  { path: 'paisos', component: PaisosComponent },
  { path: 'sales', component: SalesComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '', component: IndexComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
