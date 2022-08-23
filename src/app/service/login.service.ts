import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class LoginService{
  mockPassword: String = 'ivana'
  mockUsername:String = 'ivana'

  constructor() {  }

  login(username: String ,password: String) {

    const user = { username: username, password: password};

    if( user.password == this.mockPassword && user.username == this.mockUsername)
      sessionStorage.setItem("currentUser", JSON.stringify(user));
    if( sessionStorage.getItem("currentUser")) {
      console.log(sessionStorage.getItem("currentUser"))
      return user;
    }
    else {
      window.location.reload();
      return false;
    }
  }

}
