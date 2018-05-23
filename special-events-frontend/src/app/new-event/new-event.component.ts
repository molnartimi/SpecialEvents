import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SpecEventDto} from "../common/spec-event.dto";
import {PersonDto} from "../common/person.dto";
import {EventService} from "../services/event.service";
import {PersonService} from "../services/person.service";
import {validDate} from "../common/date-validation";

@Component({
    selector: "app-new-event",
    templateUrl: 'new-event.component.html',
    styleUrls: ['new-event.component.css']
})
export class NewEventComponent implements OnInit{
    eventType: string;
    month: number;
    day: number;
    persons: PersonDto[] = [];
    existPersons: PersonDto[] = [];
    @Output()
    addNew: EventEmitter<SpecEventDto> = new EventEmitter<SpecEventDto>();

    constructor(private personService: PersonService,
                private eventService: EventService) {
    }

    ngOnInit() {
        this.reset();
        this.personService.getPersons().then(persons => this.existPersons = persons);
    }

    private reset() {
        this.eventType = null;
        this.month = null;
        this.day = null;
        this.persons = [];
        this.addNewPerson();
    }

    addNewPerson() {
        this.persons.push(new PersonDto(0, ""));
    }

    removePerson(index: number) {
        this.persons.splice(index, 1);
    }

    saveEvent(): void {
        this.persons.map(p => p.id = this.existPersons.find(p2 => p.name === p2.name).id);
        let newEvent = new SpecEventDto(0, this.month, this.day, this. eventType, this.persons);
        this.eventService.addNewEvent(newEvent)
            .then(id => {
                newEvent.id = id;
                this.addNew.emit(newEvent);
                this.reset();
            });
    }

    validDate(): boolean {
        return validDate(this.month, this.day);
    }
}
