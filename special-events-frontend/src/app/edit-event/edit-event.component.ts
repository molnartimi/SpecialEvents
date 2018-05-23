import {Component, OnInit} from '@angular/core';
import {SpecEventDto} from "../common/spec-event.dto";
import {PersonDto} from "../common/person.dto";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {EventService} from "../services/event.service";
import {PersonService} from "../services/person.service";
import {validDate} from "../common/date-validation";

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

    constructor(private personService: PersonService,
                private eventService: EventService,
                private route: ActivatedRoute,
                private location: Location) {
    }

    ngOnInit() {
        this.id = Number(this.route.snapshot.paramMap.get('id'));
        this.personService.getPersons().then(persons => this.existPersons = persons);
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
        return validDate(this.event.month, this.event.day);
    }

    goBack(): void {
      this.location.back();
    }
}
