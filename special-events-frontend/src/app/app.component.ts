import {Component,} from '@angular/core';
import {RsApiService} from "./services/rs-api.service";
import {Router} from "@angular/router";
import {UserService} from "./services/user.service";

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css']
})
export class AppComponent {
    constructor(private userService: UserService,
                private router: Router) {}

    title = 'Special events';

    logout() {
      this.userService.logout().then(() => this.router.navigate(['']));
    }

    get authenticated(): boolean {
      return this.userService.authenticated;
    }

    get admin(): boolean {
      return this.userService.isAdmin;
    }
}


