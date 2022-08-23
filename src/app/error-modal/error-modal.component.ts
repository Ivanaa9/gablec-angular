import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Observable, of} from "rxjs";
import {MessageService} from "../service/message.service";

@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.css']
})
export class ErrorModalComponent implements OnInit {
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  @Input() textToWrite!: string;
  @Input() titleToWrite!: string;

  constructor(
    public activeModal: NgbActiveModal,
    private messageService: MessageService,
    private modalService: NgbModal
  ) {
  }

  ngOnInit(): void {
  }

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

  /** Log a BookingService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`BookingService: ${message}`);

  }

}
