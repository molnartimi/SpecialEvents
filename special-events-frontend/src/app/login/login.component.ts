import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {RsApiService} from "../services/rs-api.service";
import {UserDto} from "../common/user.dto";
import {UserService} from "../services/user.service";

@Component({
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent {

  user: UserDto;

  constructor(private userService: UserService, private router: Router) {
    this.user = new UserDto(0, "", "", "", "");
  }

  login() {
    this.userService.login(this.user).then(() => this.router.navigate(['events']));
  }

}
