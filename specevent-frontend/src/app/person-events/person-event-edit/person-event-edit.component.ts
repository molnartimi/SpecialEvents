import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {PersonDto} from "../../common/person.dto";

/**
 * Created by NB-72 on 2017. 07. 12..
 */

@Component({
    templateUrl: 'person-event-edit.component.html',
    styleUrls: ['person-event-edit.component.css']
})
export class PersonEventEditComponent implements OnInit {
    @Input() person: PersonDto;
    newPerson: PersonDto;
    @Output() save: EventEmitter<PersonDto> = new EventEmitter<PersonDto>();
    valid: boolean = true;

    ngOnInit(): void {
        this.newPerson = new PersonDto(0, this.person.name);
        // for (let e of this.person.events) {
        //     this.newPerson.events.push(new SpecEvent(this.person.name, e.eventType, e.month, e.day));
        // }
    }

    savePerson() {
        document.getElementById("setterPanel").className = "exit";
        this.save.emit(this.newPerson);
    }

    validDate(month: number, day: number): boolean {
        let shortMonths = [4, 6, 9, 11];
        if (month == null || day == null) {
            this.valid = true;
        }

        if (month < 1 || month > 12 || day < 1 || day > 31) {
            this.valid = false;
        }

        if (shortMonths.find(n => n == month)) {
            if (day > 30)
                this.valid = false;
            else
                this.valid = true;
        }
        else if (month == 2) {
            if (day > 29)
                this.valid = false;
            else
                this.valid = true;
        }
        else {
            this.valid = true;
        }

        return this.valid;
    }
}
