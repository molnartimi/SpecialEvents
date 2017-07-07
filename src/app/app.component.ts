import { Component, } from '@angular/core';

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
    
    .nav-link {
      font-size: large;
    }
  `
  ]
})
export class AppComponent {
  title = 'Special events';
}


