import {Time} from "@angular/common";

export interface Reservation {
  reservation_id: number;
  name: string;
  email?: string;
  mobile?: string;  // (alterEtgo) broj mobitela
  dateTime: string;
  guests: number; // (power) broj gostiju

}


