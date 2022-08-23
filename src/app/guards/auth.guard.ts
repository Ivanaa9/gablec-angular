import { Injectable} from '@angular/core';
import {CanActivate, Router} from "@angular/router";


@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(private router : Router) { }

  isAuthenticated(): boolean{
    if( sessionStorage.getItem("currentUser")){
      return true;
    }
    else {
      return false;
    }
  }
  canActivate(): boolean{
    if(!this.isAuthenticated()){
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }

}
