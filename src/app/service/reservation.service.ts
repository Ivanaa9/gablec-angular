import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {MessageService} from "./message.service";
import { Reservation } from '../model/reservation';


@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private reservationsUrl = 'http://localhost:8080/reservations';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET reservations from the server */

  // getReservations(body: string): Observable<any> {
  //   let headers = new HttpHeaders({'Content-Type': 'application/json'});
  //   let options = {headers: headers};
  //
  //   return this.http.post<any>(this.reservationsUrl, body, options);
  // }


    getReservations(): Observable<any> {
    return this.http.get<any>(this.reservationsUrl);
  }

  /** GET reservation by reservation_id. Return `undefined` when reservation_id not found */
  getReservationNo404<Data>(reservation_id: number): Observable<Reservation> {
    const url = `${this.reservationsUrl}/?reservation_id=${reservation_id}`;
    return this.http.get<Reservation[]>(url)
      .pipe(
        map(reservations => reservations[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? 'fetched' : 'dreservation_id not find';
          this.log(`${outcome} reservation reservation_id=${reservation_id}`);
        }),
        catchError(this.handleError<Reservation>(`getReservation reservation_id=${reservation_id}`))
      );
  }

  /** GET reservation by reservation_id. Will 404 if reservation_id not found */
  getReservation(reservation_id: number): Observable<Reservation> {
    const url = `${this.reservationsUrl}/${reservation_id}`;
    return this.http.get<Reservation>(url).pipe(
      tap(_ => this.log(`fetched reservation reservation_id=${reservation_id}`)),
      catchError(this.handleError<Reservation>(`getReservation reservation_id=${reservation_id}`))
    );
  }

  /* GET reservations whose name contains search term */
  searchReservations(term: string): Observable<Reservation[]> {
    if (!term.trim()) {
      // if not search term, return empty reservation array.
      return of([]);
    }
    return this.http.get<Reservation[]>(`${this.reservationsUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found reservations matching "${term}"`) :
        this.log(`no reservations matching "${term}"`)),
      catchError(this.handleError<Reservation[]>('searchReservations', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new reservation to the server */    /*tu me jebe ova varijabla Reservation, prije je pisalo 'reservation'*/
  addReservation(): Observable<Reservation> | null {
    // return this.http.post<Reservation>(this.reservationsUrl, reservation, this.httpOptions).pipe(
    //   tap((newReservation: Reservation) => this.log(`added reservation w/ reservation_id=${newReservation.reservation_id}`)),
    //   catchError(this.handleError<Reservation>('addReservation'))
    // );
    return null;
  }

  /** DELETE: delete the reservation from the server */
  deleteReservation(reservation_id: number): Observable<Reservation> {
    const url = `${this.reservationsUrl}/${reservation_id}`;

    return this.http.delete<Reservation>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted reservation reservation_id=${reservation_id}`)),
      catchError(this.handleError<Reservation>('deleteReservation'))
    );
  }

  /** PUT: update the reservation on the server */
  updateReservation(reservation: Reservation): Observable<any> {
    return this.http.post(this.reservationsUrl, reservation, this.httpOptions).pipe(
      tap(_ => this.log(`updated reservation reservation_id=${reservation.reservation_id}`)),
      catchError(this.handleError<any>('updateReservation'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      //console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a ReservationService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`ReservationService: ${message}`);
  }

}
