/**
 * Created by NB-72 on 2017. 07. 04..
 */

import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";
import {PersonService} from "../services/person.service";
import {SpecEventDto} from "../common/spec-event.dto";
import {PersonDto} from "../common/person.dto";
import {EventTypeEnum} from "../common/event-type-enum";

@Component({
    selector: "app-new-event",
    templateUrl: 'new-event.component.html',
    styleUrls: ['new-event.component.css']
})
export class NewEventComponent implements OnInit{
    eventType: EventTypeEnum;
    month: number;
    day: number;
    persons: PersonDto[] = [];
    @Output()
    addNew: EventEmitter<void> = new EventEmitter<void>();

    constructor(private personService: PersonService) {
    }
    
    ngOnInit() {
        this.persons.push(new PersonDto(0, ""));
    }

    saveEvent(): void {
        this.personService.addNewEvent(new SpecEventDto(0, this.month, this.day, this. eventType, this.persons)).then(() => {
            this.addNew.emit();
        });
    }

    validDate(): boolean {
        let shortMonths = [4, 6, 9, 11];
        if (this.month == null || this.day == null)
            return true;
        if (this.month < 1 || this.month > 12 || this.day < 1 || this.day > 31)
            return false;
        if (shortMonths.find(n => n == this.month))
            return (this.day <= 30);
        else if (this.month == 2)
            return (this.day <= 29);
        else
            return true;
    }
}
