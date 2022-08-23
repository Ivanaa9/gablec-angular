import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from "@angular/forms";
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppComponent } from './app.component';
import { BookingsComponent } from './bookings/bookings.component';
import {ReservationsComponent} from "./reservation/reservation.component";

import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from "@angular/common/http";
import { MessagesComponent } from './messages/messages.component';
import { ErrorModalComponent } from './error-modal/error-modal.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { MenuComponent } from './menu/menu.component';
import { ContactComponent } from './contact/contact.component';
import {AppService} from "./service/app.service";
import {LoginComponent} from "./login/login.component";




@NgModule({
  declarations: [
    AppComponent,

    BookingsComponent,
    DashboardComponent,
    MessagesComponent,
    ReservationsComponent,
    ErrorModalComponent,
    AboutusComponent,
    MenuComponent,
    ContactComponent,

    LoginComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,

  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
