/**
 * Created by NB-72 on 2017. 07. 05..
 */

import {Component, OnInit} from '@angular/core'
import {PersonService} from "../services/person.service";
import {EventItem} from "./event-item";
import {SortingFilterEnum} from "../common/sorting-filter-enum";
import {Router} from "@angular/router";
import {EventTypeEnum} from "../common/event-type-enum";

@Component({
    templateUrl: 'event-list.component.html',
    styleUrls: ['event-list.component.css']
})
export class EventListComponent implements OnInit {
    eventList: EventItem[];
    saved: boolean = false;
    orderBy: SortingFilterEnum = 1;
    addNewActive: boolean = false;

    constructor(private personService: PersonService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.personService.getEvents().then(events => {
            this.eventList = events;
            this.order(this.orderBy);
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

    order(by: SortingFilterEnum): void {
        this.orderBy = by;

        switch (this.orderBy) {
            case 1:
                this.eventList = this.eventList.sort((e1, e2) => this.orderDateAfterName(e1, e2));
                break;
            case 2:
                this.eventList = this.eventList.sort((e1, e2) => this.orderNameAfterDate(e1, e2));
                break;
            case 3:
                this.eventList = this.eventList.sort((e1, e2) => this.orderType(e1, e2));
                break;
        }
    }

    deleteEvent(event: EventItem): void {
        this.personService.deleteEvent(event.id)
            .then(() => this.update());
    }

    goToEvent(event: EventItem): void {
        this.router.navigate(['person', event.personId]);
    }

    goToHints(event: EventItem): void {
        this.router.navigate(['person', event.personId, 'gifts']);
    }

    orderDateAfterName(e1: EventItem, e2: EventItem): number {
        if (e1.month < e2.month ||
            (e1.month == e2.month && e1.day < e2.day) ||
            (e1.month == e2.month && e1.day == e2.day && e1.name.toLowerCase() < e2.name.toLowerCase()))
            return -1;
        if (e1.month > e2.month ||
            (e1.month == e2.month && e1.day > e2.day) ||
            (e1.month == e2.month && e1.day == e2.day && e1.name.toLowerCase() > e2.name.toLowerCase()))
            return 1;
        return 0;
    }

    orderNameAfterDate(e1: EventItem, e2: EventItem): number {
        if (e1.name.toLowerCase() < e2.name.toLowerCase() ||
            (e1.name.toLowerCase() === e2.name.toLowerCase() && (e1.month < e2.month ||
                (e1.month == e2.month && e1.day < e2.day))))
            return -1;
        if (e1.name.toLowerCase() > e2.name.toLowerCase() ||
            (e1.name.toLowerCase() === e2.name.toLowerCase() && (e1.month > e2.month ||
                (e1.month == e2.month && e1.day > e2.day))))
            return 1;
        return 0;
    }

    orderType(e1: EventItem, e2: EventItem): number {
        if ((e1.eventType === EventTypeEnum.BIRTHDAY && e2.eventType !== EventTypeEnum.BIRTHDAY) ||
            (e1.eventType !== EventTypeEnum.ANNIVERSARY && e2.eventType === EventTypeEnum.ANNIVERSARY))
            return -1;
        if ((e2.eventType === EventTypeEnum.BIRTHDAY && e1.eventType !== EventTypeEnum.BIRTHDAY) ||
            (e1.eventType === EventTypeEnum.ANNIVERSARY && e2.eventType !== EventTypeEnum.ANNIVERSARY))
            return 1;
        if (e1.month < e2.month || (e1.month == e2.month && e1.day < e2.day))
            return -1;
        if (e1.month > e2.month || (e1.month == e2.month && e1.day > e2.day))
            return 1;
        return 0;
    }

    update(): void {
        this.personService.getEvents().then(events => {
            this.eventList = events;
            this.order(this.orderBy);
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
