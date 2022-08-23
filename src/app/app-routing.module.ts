import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import {BookingsComponent} from "./bookings/bookings.component";
import { DashboardComponent } from './dashboard/dashboard.component';
import {ReservationsComponent} from "./reservation/reservation.component";
import {AboutusComponent} from "./aboutus/aboutus.component";
import {MenuComponent} from "./menu/menu.component";
import {ContactComponent} from "./contact/contact.component";
import {LoginComponent} from "./login/login.component";
import {AuthGuard} from "./guards/auth.guard";

const routes: Routes = [
  {path: '', component: DashboardComponent},
  // { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'bookings', component: BookingsComponent },
  { path: 'dashboard', component: DashboardComponent },

  { path: 'aboutus', component: AboutusComponent},
  { path: 'menu', component: MenuComponent},
  { path: 'contact', component: ContactComponent},
  { path: 'reservations', component: ReservationsComponent, canActivate: [AuthGuard] }, //obavezno se logirati ako zelis pogledati rezervacije
{ path: '', redirectTo: 'reservations', pathMatch: 'full' },

  { path: 'login', component: LoginComponent},
  // { path: '', redirectTo: '/dashboard', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
