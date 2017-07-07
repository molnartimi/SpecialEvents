/**
 * Created by NB-72 on 2017. 07. 04..
 */

import { Component } from '@angular/core';
import { SpecEvent } from '../common/spec-event.';
import {EventService} from "../event-service/event.service";
import {Router} from "@angular/router";
import {EventListComponent} from "../event-list/event-list.component";
import {PersonService} from "../person-service/person.service";

@Component({
  templateUrl: 'new-event.component.html',
  styleUrls: [ 'new-event.component.css']
})
export class NewEventComponent{
  eventTypeList = ['birthday', 'nameday', 'anniversary'];
  model = new SpecEvent('', null, null , null);
  name2 = '';

  constructor(
    private eventService: EventService,
    private personService: PersonService,
    private router: Router
  ) {}

  saveEvent(): void {
    if(this.model.eventType === 'anniversary')
      this.model.name += '-' + this.name2;

    this.personService.addByEvent(this.model);
    this.eventService.addEvent(this.model);
    EventListComponent.newEventsaved();
    this.router.navigate(['/events']);
  };
}
