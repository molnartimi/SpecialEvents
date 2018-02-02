import { Component, } from '@angular/core';
import {GiftsService} from "./services/gifts.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  template: `
    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          <a class="navbar-brand cim" routerLink="/" routerLinkActive="active">{{title}}</a>
        </div>

        <div class="collapse navbar-collapse">
          <ul class="nav navbar-nav mr-auto">
            <li class="nav-item">
              <a class="nav-link" routerLink="/events" routerLinkActive="active">Events</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/persons" routerLinkActive="active">Persons</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/new-event" routerLinkActive="active">Add new event</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <router-outlet></router-outlet>
  `,
  styles: [ `
    .navbar-brand {
      font-size: x-large;
      font-weight: bold;
    }
    
    .nav-link { font-size: large; }
    
    .pwdGroup {
      position: absolute;
      right: 10px;
      margin-top: 5px;
      padding: .2em;
      border-radius: 2pt;
      background-color: #dddddd;
    }
    
    input, .logged { margin-left: .2em; margin-top: .5em; }
    
    .wrong {
      border-color: #ce1218;
      border-radius: 2pt;
    }
  `
  ]
})
export class AppComponent {
  title = 'Special events';

  constructor(
    private router: Router
  ) {}
}


