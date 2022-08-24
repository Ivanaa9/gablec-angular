import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Booking} from "../model/booking";
import {BookingService} from "../service/booking.service";
import {Location} from "@angular/common";

import {HttpClient} from "@angular/common/http";
import {MessageService} from "../service/message.service";
import {ActivatedRoute} from "@angular/router";
import {ErrorModalComponent} from "../error-modal/error-modal.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";


@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})

export class BookingsComponent implements OnInit {

  @Input() booking!: Booking;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();


  /** u HTML-u onda dohvacam vrijeme i datum ovako **/
    // Date =  {{booking.timestamp.split("T")[0]}};
    // Time =  {{booking.timestamp.split("T")[1]}};


  bookings: Booking[] = [];

  constructor(private bookingService: BookingService,
              private http: HttpClient,private messageService: MessageService,
              private location: Location,
              private route: ActivatedRoute,
              private modalService: NgbModal
  ) {}


  ngOnInit(): void {
    console.log("Bookings area loading...");
    this.booking = {} as Booking;
    this.getBookings();

  }

  getBookings(): void {
    this.bookingService.getBookings()
      .subscribe(bookings => {
        this.bookings = bookings;
        console.log(bookings[2])
      });
  }


  goBack(): void {
    this.location.back();
  }
  submitted = false;

  onSubmit() {
    console.log("stisnuo sam on submit")
    this.submitted = true;


  }

  save(): void {
    this.submitted = true;

    if (this.booking) {
      console.log('bookings komponenta')
      console.log(this.booking)
      this.bookingService.updateBooking(this.booking)
        .subscribe(() => this.goBack())

      this.openModal2("Zabilježili smo tvoju rezervaciju.");
    }

  }

  openModal2(text: string) {
    const modalRef = this.modalService.open(ErrorModalComponent);
    modalRef.componentInstance.textToWrite = text;
    modalRef.componentInstance.titleToWrite = "Njam njam";

  }

  // this.openModal("Molimo te da odaberes drugo vrijeme.");


}
