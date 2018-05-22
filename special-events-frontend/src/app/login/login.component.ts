import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {RsApiService} from "../services/rs-api.service";
import {UserDto} from "../common/user.dto";

@Component({
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent {

  user: UserDto;

  constructor(private rsApiService: RsApiService, private router: Router) {
    this.user = new UserDto(0, "", "", "", "");
  }

  login() {
    this.rsApiService.login(this.user).then(() => this.router.navigate(['events']));
  }

}
