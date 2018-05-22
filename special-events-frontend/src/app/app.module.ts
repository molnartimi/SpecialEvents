import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module'
import {FormBuilder, FormsModule} from "@angular/forms";
import {NewEventComponent} from "./new-event/new-event.component";
import {EventListComponent} from "./event-list/event-list.component";
import {RsApiService} from "./services/rs-api.service";
import {HttpModule} from "@angular/http";
import {PersonListComponent} from "./person-list/persons.component";
import {PersonEventListComponent} from "./person-events/person-events-list/person-event-list.component";
import {PersonEventEditComponent} from "./person-events/person-event-edit/person-event-edit.component";
import {PersonEventsComponent} from "./person-events/person-events.component";
import {GiftsComponent} from "./gifts/gifts.component";
import {EditEventComponent} from "./edit-event/edit-event.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {WelcomeComponent} from "./welcome/welcome.component";
import {AdminComponent} from "./admin/admin.component";
import {EditUserComponent} from "./edit-user/edit-user.component";
import {UserService} from "./services/user.service";


@NgModule({
    declarations: [
        AppComponent,
        EventListComponent,
        NewEventComponent,
        EditEventComponent,
        PersonEventsComponent,
        PersonListComponent,
        PersonEventListComponent,
        PersonEventEditComponent,
        GiftsComponent,
        LoginComponent,
        RegisterComponent,
        WelcomeComponent,
        AdminComponent,
        EditUserComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        HttpModule
    ],
    providers: [
        RsApiService,
        UserService,
        FormBuilder
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
