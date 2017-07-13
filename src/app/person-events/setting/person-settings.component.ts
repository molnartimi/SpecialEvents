import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {Person} from "../../common/person";
import {SpecEvent} from "../../common/spec-event.";
/**
 * Created by NB-72 on 2017. 07. 12..
 */

@Component({
  selector: 'person-settings',
  templateUrl: 'person-settings.component.html',
  styleUrls: ['person-settings.component.css']
})
export class PersonSettingsComponent implements OnInit{
  @Input() person: Person;
  newPerson: Person;
  @Output() save: EventEmitter<Person> = new EventEmitter<Person>();
  valid: boolean = true;

  ngOnInit(): void {
    this.newPerson = new Person(this.person.name);
    for(let e of this.person.events){
      this.newPerson.events.push(new SpecEvent(e.eventType,e.month,e.day));
    }
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
