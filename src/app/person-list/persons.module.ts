/**
 * Created by NB-72 on 2017. 07. 06..
 */

import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

import {PersonListComponent} from "./person-list.component";
import {PersonEventsComponent} from "../person-events/person-events.component";

import {PersonService} from "../services/person.service";
import {PersonsRoutingModule} from "./persons-routing.module";
import {GiftsComponent} from "../gifts/gifts.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PersonsRoutingModule
  ],
  declarations: [
    PersonListComponent,
    PersonEventsComponent,
    GiftsComponent
  ],
  providers: [
    PersonService
  ]
})
export class PersonsModule {}
