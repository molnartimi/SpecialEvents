import {Component, OnInit} from '@angular/core'
import {Router} from "@angular/router";
import {SpecEventDto} from "../common/spec-event.dto";
import {PersonDto} from "../common/person.dto";
import {EventService} from "../services/event.service";

@Component({
    templateUrl: 'event-list.component.html',
    styleUrls: ['event-list.component.css']
})
export class EventListComponent implements OnInit {
    eventList: SpecEventDto[];
    addNewActive: boolean = false;

    constructor(private eventService: EventService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.eventService.getEvents().then(events => {
            this.eventList = events;
        });
    }

    deleteEvent(event: SpecEventDto): void {
         this.eventService.deleteEvent(event.id).then(success => {
             let index = this.eventList.indexOf(event);
             this.eventList.splice(index, 1);
         });
    }

    goToEvent(event: SpecEventDto): void {
      this.router.navigate(['event', event.id, 'edit']);
    }

    goToHints(person: PersonDto): void {
        this.router.navigate(['person', person.id, 'gifts']);
    }

    addNew() {
        this.addNewActive = true;
    }

    closeAddNew() {
        this.addNewActive = false;
    }

    newEventAdded(event) {
        this.addNewActive = false;
        this.eventList.push(event);
    }
}
