/**
 * Created by NB-72 on 2017. 07. 04..
 */

import {Component} from '@angular/core';
import {SpecEvent} from '../common/spec-event.';
import {Router} from "@angular/router";
import {EventListComponent} from "../event-list/event-list.component";
import {PersonService} from "../services/person.service";
import {EventTypeEnum} from "../common/event-type-enum";

@Component({
    templateUrl: 'new-event.component.html',
    styleUrls: ['new-event.component.css']
})
export class NewEventComponent {
    eventTypeList = [EventTypeEnum.BIRTHDAY, EventTypeEnum.NAMEDAY, EventTypeEnum.ANNIVERSARY];
    event = new SpecEvent(null, null, null, null);
    name = '';
    name2 = '';

    constructor(private personService: PersonService,
                private router: Router) {
    }

    saveEvent(): void {
        if (this.event.eventType == 3)
            this.name += '-' + this.name2;
        this.event.name = this.name;
        this.personService.addNewEvent(this.event).then(() => {
            EventListComponent.newEventsaved();
            this.router.navigate(['/events'])
        });
    }

    validDate(): boolean {
        let shortMonths = [4, 6, 9, 11];
        if (this.event.month == null || this.event.day == null)
            return true;
        if (this.event.month < 1 || this.event.month > 12 || this.event.day < 1 || this.event.day > 31)
            return false;
        if (shortMonths.find(n => n == this.event.month))
            if (this.event.day > 30)
                return false;
            else
                return true;
        else if (this.event.month == 2)
            if (this.event.day > 29)
                return false;
            else
                return true;
        else
            return true;
    }
}
