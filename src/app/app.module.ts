import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module'
import {FormsModule} from "@angular/forms";
import {EventService} from "./event-service/event.service";
import { NewEventComponent } from "./new-event/new-event.component";
import { EventListComponent } from "./event-list/event-list.component";
import {PersonService} from "./person-service/person.service";
import {PersonsModule} from "./person-list/persons.module";


@NgModule({
  declarations: [
    AppComponent,
    EventListComponent,
    NewEventComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    PersonsModule,
    AppRoutingModule
  ],
  providers: [
    EventService,
    PersonService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
