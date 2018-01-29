/**
 * Created by NB-72 on 2017. 07. 06..
 */

import {Injectable} from "@angular/core";
import {Person} from "../common/person";
import {SpecEvent} from "../common/spec-event.";
import {EventItem} from "../event-list/event-item";
import {AuthService} from "./auth.service";
import {GiftsService} from "./gifts.service";
import {PERSONS} from "./mock-datas"
import {EventTypeEnum} from "../common/event-type-enum";
import {Http} from "@angular/http";
import 'rxjs/add/operator/toPromise';

@Injectable()
export class PersonService {
    private eventsUrl = "api/events";
    private personsUrl = "api/persons";
    private personUrl = "api/person";
    private personList;

    constructor(private authService: AuthService,
                private giftService: GiftsService,
                private http: Http) {
    }

    getPersons(): Promise<Person[]> {
        return this.http.get(this.personsUrl)
            .toPromise()
            .then(response => this.order(response.json() as Person[]));
    }

    getPerson(id: number): Promise<Person> {
        return this.http.get(this.personUrl + '/' + id)
            .toPromise()
            .then(response => response.json() as Person);
    }

    getEvents(): Promise<EventItem[]> {
        return this.http.get(this.eventsUrl)
            .toPromise()
            .then(response => response.json() as EventItem[]);
    }

    addNewEvent(name: string, event: SpecEvent): boolean {
        let person = this.personList.find(p => p.name === name);
        if (!person) {
            this.personList.push(new Person(name, event));
            return true;
        }
        else {
            let eventTemp = person.events.find(e => e.eventType === event.eventType);
            if (eventTemp) {
                alert(name + "'s " + event.eventType + " is already in the list: " +
                    eventTemp.month + "." + eventTemp.day + ".");
                return false;
            }
            else {
                let text = "There is already a person with name " + name + " in the list, this is the same person?\n";
                for (let e of person.events)
                    text += e.month.toString() + "." + e.day.toString() + ". - " + e.eventType + "\n";
                let c = confirm(text);
                if (c) {
                    person.events.push(event);
                    return true;
                }
                return false;
            }
        }
    }

    deleteEvent(id: number, eventType: EventTypeEnum): void {
        if (this.authService.isLogged()) {
            let person = this.personList.find(p => p.id === id);
            let c = confirm("Are you sure you want to delete " + person.name + "'s event?");
            if (c) {
                let event = person.events.find(e => e.eventType === eventType);
                let index = person.events.indexOf(event, 0);
                person.events.splice(index, 1);

                if (!person.events.length) {
                    this.personList.splice(this.personList.indexOf(person), 1);
                    this.giftService.deletePerson(person.id);
                }
            }
        }
        else {
            alert("You have to be logged in as an ADMIN to delete event!");
        }
    }

    deletePerson(person: Person) {
        if (this.authService.isLogged()) {
            let c = confirm("Are you sure you want to delete " + person.name + " from the list?");
            if (c) {
                this.personList.splice(this.personList.indexOf(person), 1);
                this.giftService.deletePerson(person.id);
            }
        }
        else {
            alert("You have to be logged in as an ADMIN to delete person!")
        }
    }

    order(persons): Person[] {
        return persons.sort((p1, p2) => {
            if (p1.name.toLowerCase() < p2.name.toLowerCase())
                return -1;
            if (p1.name.toLowerCase() > p2.name.toLowerCase())
                return 1;
            return 0;
        });
    }

}
