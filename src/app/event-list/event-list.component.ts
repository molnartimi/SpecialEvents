/**
 * Created by NB-72 on 2017. 07. 05..
 */

import { Component, OnInit } from '@angular/core'
import {SpecEvent} from "../common/spec-event.";
import {EventService} from "../event-service/event.service";

@Component ({
  templateUrl: 'event-list.component.html',
  styleUrls: ['event-list.component.css']
})
export class EventListComponent implements OnInit{
  eventList: SpecEvent[] = [];
  static saved: boolean = false;

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.eventList = this.eventService.getEvents();

    if(EventListComponent.saved){
      let snack = document.getElementById("snackbar");
      snack.className = "show";
      setTimeout(() => {
        snack.className = snack.className.replace("show","")
      }, 2000);
      EventListComponent.saved = false;
    }
  }

  order(by: number): void {
    this.eventService.order(by);
  }

  static newEventsaved(): void {
    this.saved = true;
  }
}
