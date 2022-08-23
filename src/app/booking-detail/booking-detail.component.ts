import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {BookingService} from "../service/booking.service";
import {Booking} from "../model/booking";

@Component({
  selector: 'app-booking-detail',
  templateUrl: './booking-detail.component.html',
  styleUrls: ['./booking-detail.component.css']
})
export class BookingDetailComponent implements OnInit {
  booking: Booking | undefined;

  constructor(
    private route: ActivatedRoute,
    private bookingService: BookingService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getBooking();
  }


  getBooking(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.bookingService.getBooking(id)
      .subscribe(booking => this.booking = booking);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.booking) {
      this.bookingService.updateBooking(this.booking)
        .subscribe(() => this.goBack());
    }
  }
}
