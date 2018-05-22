import { Component } from '@angular/core';
import {UserService} from "../services/user.service";

@Component({
  templateUrl: 'welcome.component.html',
  styleUrls: ['welcome.component.css']
})
export class WelcomeComponent {
  constructor(private userService: UserService) {}

  get authenticated(): boolean {
    return this.userService.authenticated;
  }

  get username(): string {
    return JSON.parse(localStorage.getItem('currentUser')).fullName;
  }
}
