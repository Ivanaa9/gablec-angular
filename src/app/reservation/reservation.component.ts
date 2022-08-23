import {Component, OnInit} from '@angular/core';
import {Reservation} from "../model/reservation";
import {ReservationService} from "../service/reservation.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-reservations',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationsComponent implements OnInit {

  reservations: Reservation[] = [];
  reservation: Reservation | undefined;

  constructor(
    private reservationService: ReservationService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    console.log("Reservations area loading...");
    this.reservation = {} as Reservation;
    this.reservationService.updateReservation(this.reservation)
    this.getReservations();
  }


  getReservations(): void {
    this.reservationService.getReservations()
      .subscribe(reservations => {
        this.reservations = reservations;
        console.log(reservations[0])
      });
  }

}
