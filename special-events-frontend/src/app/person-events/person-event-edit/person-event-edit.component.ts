import {Component} from "@angular/core";
import {PersonEventsComponent} from "../person-events.component";
import {validDate} from "../../common/date-validation";

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
        return validDate(month, day);
    }
}
