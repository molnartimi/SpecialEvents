import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {RsApiService} from "../services/rs-api.service";
import {UserDto} from "../common/user.dto";
import {UserService} from "../services/user.service";

@Component({
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.css']
})
export class RegisterComponent {

  newUser: UserDto;

  constructor(private userService: UserService, private router: Router) {
    this.newUser = new UserDto(0, "", "", "", "");
  }

  register() {
    this.userService.register(this.newUser).then(() => this.router.navigate(['']));
  }

}
