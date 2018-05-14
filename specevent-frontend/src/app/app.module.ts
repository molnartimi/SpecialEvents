import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module'
import {FormBuilder, FormsModule} from "@angular/forms";
import {NewEventComponent} from "./new-event/new-event.component";
import {EventListComponent} from "./event-list/event-list.component";
import {RsApiService} from "./services/rs-api.service";
import {GiftsService} from "./services/gifts.service";
import {HttpModule} from "@angular/http";
import {PersonListComponent} from "./person-list/persons.component";
import {PersonEventListComponent} from "./person-events/person-events-list/person-event-list.component";
import {PersonEventEditComponent} from "./person-events/person-event-edit/person-event-edit.component";
import {PersonEventsComponent} from "./person-events/person-events.component";
import {GiftsComponent} from "./gifts/gifts.component";


@NgModule({
    declarations: [
        AppComponent,
        EventListComponent,
        NewEventComponent,
        PersonEventsComponent,
        PersonListComponent,
        PersonEventListComponent,
        PersonEventEditComponent,
        GiftsComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        HttpModule
    ],
    providers: [
        RsApiService,
        GiftsService,
        FormBuilder
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
