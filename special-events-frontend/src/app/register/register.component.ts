import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {RsApiService} from "../services/rs-api.service";
import {UserDto} from "../common/user.dto";

@Component({
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.css']
})
export class RegisterComponent {

  newUser: UserDto;

  constructor(private rsApiService: RsApiService, private router: Router) {
    this.newUser = new UserDto(0, "", "", "", "");
  }

  register() {
    this.rsApiService.createAccount(this.newUser).then(() => this.router.navigate(['']));
  }

}
