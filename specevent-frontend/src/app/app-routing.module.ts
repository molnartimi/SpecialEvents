/**
 * Created by NB-72 on 2017. 07. 06..
 */
import { NgModule } from '@angular/core';
import { RouterModule }  from '@angular/router';

import { NewEventComponent } from "./new-event/new-event.component";
import { EventListComponent } from "./event-list/event-list.component";

@NgModule({
  imports: [
    RouterModule.forRoot([
      {path: 'events', component: EventListComponent},
      {path: 'new-event', component: NewEventComponent},
      {
        path: '',
        redirectTo: '/events',
        pathMatch: 'full'
      }]
    )
  ],
  exports: [
    RouterModule
    ]
})
export class AppRoutingModule {}
