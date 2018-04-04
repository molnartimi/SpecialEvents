/**
 * Created by NB-72 on 2017. 07. 06..
 */

import {Injectable} from "@angular/core";
import {Person} from "../common/person";
import {SpecEvent} from "../common/spec-event.";
import {EventItem} from "../event-list/event-item";
import {GiftsService} from "./gifts.service";
import {EventTypeEnum} from "../common/event-type-enum";
import {Http, RequestOptions, Headers, URLSearchParams} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {PersonDto} from "../common/person.dto";
import {SpecEventDto} from "../common/spec-event.dto";

@Injectable()
export class PersonService {
    private eventsUrl = "api/events";
    private personsUrl = "api/persons";
    private personUrl = "api/person";
    private newPersonUrl = "api/new-person";
    private newEventUrl = "api/new-event";
    private deleteEventUrl = "api/delete-event";
    private deletePersonUrl = "api/delete-person";
    private personList;

    constructor(private giftService: GiftsService,
                private http: Http) {
    }

    getPersons(): Promise<Person[]> {
        return this.http.get(this.personsUrl)
            .toPromise()
            .then(response => this.order(response.json() as Person[]));
    }

    getPerson(id: number): Promise<Person> {
        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        let myParams = new URLSearchParams();
        myParams.append('id', id.toString());
        let options = new RequestOptions({headers: myHeaders, params: myParams});

        return this.http.get(this.personUrl, options)
            .toPromise()
            .then(response => response.json() as Person);
    }

    getEvents(): Promise<EventItem[]> {
        return this.http.get(this.eventsUrl)
            .toPromise()
            .then(response => response.json() as EventItem[]);
    }

    addNewEvent(event: SpecEventDto): Promise<any> {
        return this.http.post(this.newEventUrl, event).toPromise();
    }

    deleteEvent(id: number): Promise<any> {

        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        let myParams = new URLSearchParams();
        myParams.append('id', id.toString());
        let options = new RequestOptions({headers: myHeaders, params: myParams});

        return this.http.delete(this.deleteEventUrl, options).toPromise();
    }

    deletePerson(id: number): Promise<any> {

        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        let myParams = new URLSearchParams();
        myParams.append('id', id.toString());
        let options = new RequestOptions({headers: myHeaders, params: myParams});

        return this.http.delete(this.deletePersonUrl, options).toPromise();

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

    savePerson(newPerson: PersonDto): Promise<any> {
        return this.http.post(this.newPersonUrl, newPerson).toPromise();
    }
}
