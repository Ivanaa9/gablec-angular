import { Component, OnInit } from '@angular/core';

import {Booking} from "../model/booking";
import {BookingService} from "../service/booking.service";
import {HttpHeaders} from "@angular/common/http";
import {AppService} from "../service/app.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {

  private dashboardUrl = 'http://localhost:8080/';  // URL to web api

  // httpOptions = {
  //   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  // };

  bookings: Booking[] = [];

  constructor(private bookingService: BookingService,
              private app: AppService) { }



  ngOnInit(): void {
    // this.getHeroes();
    this.getBookings();
  }

  getBookings(): void {
    this.bookingService.getBookings()
      .subscribe(bookings => this.bookings = bookings.slice(1, 6));
  }


}
