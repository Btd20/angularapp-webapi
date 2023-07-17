import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { IndexComponent } from './index/index.component';
import { SalesComponent } from './sales/sales.component';
import { PaisosComponent } from './paisos/paisos.component';
import { ProfileComponent } from './profile/profile.component';
import { CiutatsComponent } from './ciutats/ciutats.component';
import { OficinesComponent } from './oficines/oficines.component';
import { RoomsComponent } from './rooms/rooms.component';
import { AdminComponent } from './admin/admin.component';
import { AdminMRComponent } from './admin-modifyrooms/admin-modifyrooms.component';
import { AdminMOComponent } from './admin-modifyoficines/admin-modifyoficines.component';
import { ReservesComponent } from './reserves/reserves.component';

const routes: Routes = [
  { path: 'reserves',component: ReservesComponent},
  { path: 'admin', component: AdminComponent },
  { path: 'admin-modifyrooms', component: AdminMRComponent },
  { path: 'admin-modifyoficines', component: AdminMOComponent },
  //{ path: 'admin-modifypaisos', component: AdminMPComponent },
  //{ path: 'admin-modifyciutats', component: AdminMCComponent },
  { path: 'rooms', component: RoomsComponent },
  { path: 'ciutats', component: CiutatsComponent },
  { path: 'oficines', component: OficinesComponent},
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
