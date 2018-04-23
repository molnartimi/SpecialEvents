/**
 * Created by NB-72 on 2017. 07. 06..
 */

import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

import {PersonListComponent} from "./persons.component";
import {PersonEventsComponent} from "./personal-events/person-events.component";

import {RsApiService} from "../services/rs-api.service";
import {PersonsRoutingModule} from "./persons-routing.module";
import {GiftsComponent} from "../gifts/gifts.component";
import {PersonSettingsComponent} from "./setting/person-settings.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        PersonsRoutingModule
    ],
    declarations: [
        PersonListComponent,
        PersonEventsComponent,
        PersonSettingsComponent,
        GiftsComponent
    ],
    providers: [
        RsApiService
    ]
})
export class PersonsModule {
}
