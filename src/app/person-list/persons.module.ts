/**
 * Created by NB-72 on 2017. 07. 06..
 */

import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

import {PersonListComponent} from "./person-list.component";
import {PersonEventsComponent} from "../person-events/person-events.component";

import {PersonService} from "../person-service/person.service";
import {PersonsRoutingModule} from "./persons-routing.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PersonsRoutingModule
  ],
  declarations: [
    PersonListComponent,
    PersonEventsComponent
  ],
  providers: [
    PersonService
  ]
})
export class PersonsModule {}
