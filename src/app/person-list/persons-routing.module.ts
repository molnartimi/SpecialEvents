/**
 * Created by NB-72 on 2017. 07. 06..
 */

import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";

import {PersonListComponent} from "./person-list.component";
import {PersonEventsComponent} from "../person-events/person-events.component";
import {GiftsComponent} from "../gifts/gifts.component";

@NgModule({
  imports: [
    RouterModule.forChild([
      {path: 'persons', component: PersonListComponent},
      {path: 'person/:name', component: PersonEventsComponent},
      {path: 'person/:name/gifts', component: GiftsComponent}
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class PersonsRoutingModule {}
