import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {LoginService} from "../service/login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  // @ts-ignore

  user: String | null;
  data: any;

  constructor( private router: Router,
               private loginService: LoginService) { }

  ngOnInit(): void {
    this.user = sessionStorage.getItem("currentUser");
    if(this.user)
      this.router.navigate(['']);
  }

  // @ts-ignore
  login(data) {
    this.loginService.login(data.username, data.password);
    this.router.navigate(['']);
  }


}
