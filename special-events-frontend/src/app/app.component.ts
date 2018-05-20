import {Component,} from '@angular/core';
import {RsApiService} from "./services/rs-api.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css']
})
export class AppComponent {
    constructor(private rsApiServive: RsApiService,
                private router: Router) {

    }

    title = 'Special events';

    logout() {
      this.rsApiServive.logout().then(() => this.router.navigate(['']));
    }

    get authenticated(): boolean {
      return this.rsApiServive.authenticated;
    }
}


