import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, of, Subject} from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {MessageService} from "./message.service";
import { Booking } from '../model/booking';
import {ErrorModalComponent} from "../error-modal/error-modal.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private bookingsUrl = 'http://localhost:8080/booking';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  booking: Booking | undefined;

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private modalService: NgbModal
  ) { }

  /** GET bookings from the server */
  getBookings(): Observable<any> {
    return this.http.get<any>(this.bookingsUrl);
  }

  /** GET booking by booking_id. Return `undefined` when booking_id not found */
  getBookingNo404<Data>(booking_id: number): Observable<Booking> {
    const url = `${this.bookingsUrl}/?booking_id=${booking_id}`;
    return this.http.get<Booking[]>(url)
      .pipe(
        map(bookings => bookings[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? 'fetched' : 'dbooking_id not find';
          this.log(`${outcome} booking booking_id=${booking_id}`);
        }),
        catchError(this.handleError<Booking>(`getBooking booking_id=${booking_id}`))
      );
  }

  /** GET booking by booking_id. Will 404 if booking_id not found */
  getBooking(booking_id: number): Observable<Booking> {
    const url = `${this.bookingsUrl}/${booking_id}`;
    return this.http.get<Booking>(url).pipe(
      tap(_ => this.log(`fetched booking booking_id=${booking_id}`)),
      catchError(this.handleError<Booking>(`getBooking booking_id=${booking_id}`))
    );
  }

  /* GET bookings whose name contains search term */
  searchBookings(term: string): Observable<Booking[]> {
    if (!term.trim()) {
      // if not search term, return empty booking array.
      return of([]);
    }
    return this.http.get<Booking[]>(`${this.bookingsUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found bookings matching "${term}"`) :
        this.log(`no bookings matching "${term}"`)),
      catchError(this.handleError<Booking[]>('searchBookings', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new booking to the server */    /*tu me jebe ova varijabla Booking, prije je pisalo 'booking'*/

  addBooking(): Observable<Booking> | null {
    return this.http.post<Booking>(this.bookingsUrl, this.booking, this.httpOptions).pipe(
      tap((newBooking: Booking) => this.log(`added booking w/ booking_id=${newBooking.booking_id}`)),
      catchError(this.handleError<Booking>('addBooking'))
    );
    return null;
  }

  /** DELETE: delete the booking from the server */
  deleteBooking(booking_id: number): Observable<Booking> {
    const url = `${this.bookingsUrl}/${booking_id}`;

    return this.http.delete<Booking>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted booking booking_id=${booking_id}`)),
      catchError(this.handleError<Booking>('deleteBooking'))
    );
  }

  /** POST: update the booking on the server */
  updateBooking(booking: Booking): Observable<any> {
    console.log(booking)
    return this.http.post(this.bookingsUrl, booking, this.httpOptions).pipe(
      tap(_ => this.log(`updated booking booking_id=${booking.booking_id}`),),
      catchError(this.handleError<any>('updateBooking'))
    );
  }



  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result? - optional value to return as the observable result
   */
  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      //console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${result} failed: ${error.message}`);

      this.openModal("Molimo te da odaberes drugo vrijeme.");

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  openModal(text: string) {
    const modalRef = this.modalService.open(ErrorModalComponent);
    modalRef.componentInstance.textToWrite = text;
    modalRef.componentInstance.titleToWrite = "Upsss, cini se da su nam tada zauzeti svi stolovi.";
  }



  /** Log a BookingService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`BookingService: ${message}`);
  }


}
