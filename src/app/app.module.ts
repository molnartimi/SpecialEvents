import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module'
import {FormBuilder, FormsModule} from "@angular/forms";
import { NewEventComponent } from "./new-event/new-event.component";
import { EventListComponent } from "./event-list/event-list.component";
import { PersonService } from "./services/person.service";
import { AuthService } from "./services/auth.service";
import { PersonsModule } from "./person-list/persons.module";
import {GiftsService} from "./services/gifts.service";
import {SettingComponent} from "./setting/setting.component";


@NgModule({
  declarations: [
    AppComponent,
    EventListComponent,
    NewEventComponent,
    SettingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    PersonsModule,
    AppRoutingModule
  ],
  providers: [
    PersonService,
    GiftsService,
    AuthService,
    FormBuilder
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
