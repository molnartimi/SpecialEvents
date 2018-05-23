/**
 * Created by NB-72 on 2017. 07. 04..
 */

import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {RsApiService} from "../services/rs-api.service";
import {SpecEventDto} from "../common/spec-event.dto";
import {PersonDto} from "../common/person.dto";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {EventService} from "../services/event.service";

@Component({
    templateUrl: 'edit-event.component.html',
    styleUrls: ['edit-event.component.css']
})
export class EditEventComponent implements OnInit{
    id: number;
    event: SpecEventDto;
    persons: PersonDto[] = [];
    existPersons: PersonDto[] = [];
    newPerson = "";

    constructor(private rsApiService: RsApiService,
                private eventService: EventService,
                private route: ActivatedRoute,
                private location: Location) {
    }

    ngOnInit() {
        this.id = Number(this.route.snapshot.paramMap.get('id'));
        this.rsApiService.getPersons().then(persons => this.existPersons = persons);
        this.eventService.getEvent(this.id).then(event => this.event = event);
    }

    addPerson() {
        this.event.persons.push(new PersonDto(0, this.newPerson));
        this.newPerson = "";
    }

    removePerson(index: number) {
        this.event.persons.splice(index, 1);
    }

    saveEvent() {
      this.event.persons.map(p => p.id = this.existPersons.find(p2 => p.name === p2.name).id);
      this.eventService.editEvents(Array(this.event))
        .then(id => {
          this.goBack();
        });
    }

    validDate(): boolean {
        let shortMonths = [4, 6, 9, 11];
        if (this.event.month == null || this.event.day == null)
            return true;
        if (this.event.month < 1 || this.event.month > 12 || this.event.day < 1 || this.event.day > 31)
            return false;
        if (shortMonths.find(n => n == this.event.month))
            return (this.event.day <= 30);
        else if (this.event.month == 2)
            return (this.event.day <= 29);
        else
            return true;
    }

    goBack(): void {
      this.location.back();
    }
}
