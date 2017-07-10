/**
 * Created by NB-72 on 2017. 07. 04..
 */

import { Component } from '@angular/core';
import { SpecEvent } from '../common/spec-event.';
import {Router} from "@angular/router";
import {EventListComponent} from "../event-list/event-list.component";
import {PersonService} from "../person-service/person.service";

@Component({
  templateUrl: 'new-event.component.html',
  styleUrls: [ 'new-event.component.css']
})
export class NewEventComponent{
  eventTypeList = ['birthday', 'nameday', 'anniversary'];
  event = new SpecEvent(null,null,null);
  name = '';
  name2 = '';

  constructor(
    private personService: PersonService,
    private router: Router
  ) {}

  saveEvent(): void {
    if(this.event.eventType === 'anniversary')
      this.name += '-' + this.name2;

    this.personService.addNewEvent(this.name,this.event);
    EventListComponent.newEventsaved();
    this.router.navigate(['/events']);
  } 
}
