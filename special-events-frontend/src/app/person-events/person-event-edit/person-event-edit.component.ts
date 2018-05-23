import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {PersonDto} from "../../common/person.dto";
import {PersonEventsComponent} from "../person-events.component";

/**
 * Created by NB-72 on 2017. 07. 12..
 */

@Component({
    selector: 'app-edit-person-events',
    templateUrl: 'person-event-edit.component.html',
    styleUrls: ['person-event-edit.component.css']
})
export class PersonEventEditComponent extends PersonEventsComponent{
    valid: boolean = true;

    savePerson() {
        this.personService.editPerson(this.person).then(response => {
          this.eventService.editEvents(this.events).then(response => this.goBack());
        });
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
