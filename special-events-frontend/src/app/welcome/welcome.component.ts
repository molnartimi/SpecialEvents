import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {RsApiService} from "../services/rs-api.service";
import {UserDto} from "../common/user.dto";

@Component({
  templateUrl: 'welcome.component.html',
  styleUrls: ['welcome.component.css']
})
export class WelcomeComponent {
  constructor(private rsApiService: RsApiService) {}

  get authenticated(): boolean {
    return this.rsApiService.authenticated;
  }

  get username(): string {
    return JSON.parse(localStorage.getItem('currentUser')).fullName;
  }
}
