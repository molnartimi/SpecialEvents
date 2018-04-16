/**
 * Created by NB-72 on 2017. 07. 05..
 */

import {Component, OnInit} from '@angular/core'
import {PersonService} from "../services/person.service";
import {Router} from "@angular/router";
import {SpecEventDto} from "../common/spec-event.dto";

@Component({
    templateUrl: 'event-list.component.html',
    styleUrls: ['event-list.component.css']
})
export class EventListComponent implements OnInit {
    eventList: SpecEventDto[];
    saved: boolean = false;
    addNewActive: boolean = false;

    constructor(private personService: PersonService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.personService.getEvents().then(events => {
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
        // this.personService.deleteEvent(event.id)
        //     .then(() => this.update());
    }

    goToEvent(event: SpecEventDto): void {
        // this.router.navigate(['person', event.personId]);
    }

    goToHints(event: SpecEventDto): void {
        // this.router.navigate(['person', event.personId, 'gifts']);
    }


    update(): void {
        this.personService.getEvents().then(events => {
            this.eventList = events;
        });
    }
    
    addNew() {
        this.addNewActive = true;
    }

    newEventAdded() {
        this.saved = true;
        this.addNewActive = false;
        this.update();
    }
}
