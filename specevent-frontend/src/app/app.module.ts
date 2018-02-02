import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module'
import {FormBuilder, FormsModule} from "@angular/forms";
import {NewEventComponent} from "./new-event/new-event.component";
import {EventListComponent} from "./event-list/event-list.component";
import {PersonService} from "./services/person.service";
import {PersonsModule} from "./persons/persons.module";
import {GiftsService} from "./services/gifts.service";
import {HttpModule} from "@angular/http";


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
        AppRoutingModule,
        HttpModule
    ],
    providers: [
        PersonService,
        GiftsService,
        FormBuilder
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
