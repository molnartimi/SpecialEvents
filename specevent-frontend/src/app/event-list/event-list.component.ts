/**
 * Created by NB-72 on 2017. 07. 05..
 */

import {Component, OnInit} from '@angular/core'
import {RsApiService} from "../services/rs-api.service";
import {Router} from "@angular/router";
import {SpecEventDto} from "../common/spec-event.dto";
import {PersonDto} from "../common/person.dto";

@Component({
    templateUrl: 'event-list.component.html',
    styleUrls: ['event-list.component.css']
})
export class EventListComponent implements OnInit {
    eventList: SpecEventDto[];
    saved: boolean = false;
    addNewActive: boolean = false;

    constructor(private rsApiService: RsApiService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.rsApiService.getEvents().then(events => {
            this.eventList = events;
        });

        if (this.saved) {
            let snack = document.getElementById("snackbar");
            snack.className = "show";
            setTimeout(() => {
                snack.className = snack.className.replace("show", "")
            }, 2000);
            this.saved = false;
        }
    }

    deleteEvent(event: SpecEventDto): void {
         this.rsApiService.deleteEvent(event.id).then(success => {
             let index = this.eventList.indexOf(event);
             this.eventList.splice(index, 1);
         });
    }

    deleteEventFromPerson(person: PersonDto, event: SpecEventDto): void {
        this.rsApiService.deleteEventFromPerson(person.id, event.id).then(success => {
            let personIndex = event.persons.indexOf(person);
            event.persons.splice(personIndex, 1);
            if (event.persons.length == 0)
                this.eventList.splice(this.eventList.indexOf(event), 1);
        });
    }

    goToEvent(event: SpecEventDto): void {
      this.router.navigate(['event', event.id, 'edit']);
    }

    goToPersonEvent(person: PersonDto, event: SpecEventDto): void {
      this.router.navigate(['person', person.id, "edit"]);
    }

    goToHints(event: SpecEventDto): void {
        // this.router.navigate(['person', event.personId, 'gifts']);
    }


    update(): void {
        this.rsApiService.getEvents().then(events => {
            this.eventList = events;
        });
    }

    addNew() {
        this.addNewActive = true;
    }

    closeAddNew() {
        this.addNewActive = false;
    }

    newEventAdded(event) {
        this.saved = true;
        this.addNewActive = false;
        this.eventList.push(event);
    }
}
