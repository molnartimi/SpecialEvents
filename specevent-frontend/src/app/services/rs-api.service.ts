/**
 * Created by NB-72 on 2017. 07. 06..
 */

import {Injectable} from "@angular/core";
import {Http, RequestOptions, Headers, URLSearchParams} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {PersonDto} from "../common/person.dto";
import {SpecEventDto} from "../common/spec-event.dto";
import {GiftDto} from "../common/gift.dto";

@Injectable()
export class RsApiService {
    private eventsUrl = "api/events";
    private personsUrl = "api/persons";
    private personUrl = "api/person";
    private eventUrl = "api/event";
    private newPersonUrl = "api/new-person";
    private newEventUrl = "api/new-event";
    private deleteEventUrl = "api/delete-event";
    private deleteEventFromPersonUrl = "api/delete-event-person";
    private deletePersonUrl = "api/delete-person";
    private editPersonNameUrl = "api/edit-person";
    private editEventsUrl = "api/edit-events";
    private giftsUrl = "api/gifts";
    private saveGiftsUrl = "api/save-gifts";

    constructor(private http: Http) {}

    getPersons(): Promise<PersonDto[]> {
        return this.http.get(this.personsUrl)
            .toPromise()
            .then(response => this.order(response.json() as PersonDto[]));
    }

    getPerson(id: number): Promise<PersonDto> {
        let url = this.personUrl + '/' + id;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as PersonDto);
    }

    getEvent(id: number): Promise<SpecEventDto> {
       return this.http.get(this.eventUrl + "/" + id)
         .toPromise()
         .then(response => response.json() as SpecEventDto);
    }

    getPersonEvents(id: number): Promise<SpecEventDto[]> {
        let url = this.personUrl + '/' + id + '/events';
        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as SpecEventDto[]);
    }

    getEvents(): Promise<SpecEventDto[]> {
        return this.http.get(this.eventsUrl)
            .toPromise()
            .then(response => response.json() as SpecEventDto[]);
    }

    addNewEvent(event: SpecEventDto): Promise<number> {
        return this.http.post(this.newEventUrl, event)
            .toPromise()
            .then( response => response.json() as number);
    }

    deleteEvent(id: number): Promise<boolean> {

        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        let myParams = new URLSearchParams();
        myParams.append('id', id.toString());
        let options = new RequestOptions({headers: myHeaders, params: myParams});

        return this.http.delete(this.deleteEventUrl, options)
            .toPromise()
            .then( response => response.json() as boolean);
    }

    deleteEventFromPerson(personId: number, id: number): Promise<boolean> {

        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        let myParams = new URLSearchParams();
        myParams.append('id', id.toString());
        myParams.append('personId', personId.toString());
        let options = new RequestOptions({headers: myHeaders, params: myParams});

        return this.http.delete(this.deleteEventFromPersonUrl, options)
            .toPromise()
            .then( response => response.json() as boolean);
    }

    deletePerson(id: number): Promise<boolean> {

        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        let myParams = new URLSearchParams();
        myParams.append('id', id.toString());
        let options = new RequestOptions({headers: myHeaders, params: myParams});

        return this.http.delete(this.deletePersonUrl, options)
            .toPromise()
            .then( response => response.json() as boolean);

    }

    order(persons): PersonDto[] {
        return persons.sort((p1, p2) => {
            if (p1.name.toLowerCase() < p2.name.toLowerCase())
                return -1;
            if (p1.name.toLowerCase() > p2.name.toLowerCase())
                return 1;
            return 0;
        });
    }

    savePerson(newPerson: PersonDto): Promise<number> {
        return this.http.post(this.newPersonUrl, newPerson)
            .toPromise()
            .then( response => response.json() as number);
    }

    editPerson(person: PersonDto) {
      return this.http.put(this.editPersonNameUrl, person)
        .toPromise()
        .then(response => response.json() as boolean);
    }

    editEvents(events: SpecEventDto[]): Promise<boolean> {
      return this.http.put(this.editEventsUrl, events)
        .toPromise()
        .then(response => response.json() as boolean);
    }

    getGifts(id: number): Promise<GiftDto[]> {
      let myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      let myParams = new URLSearchParams();
      myParams.append('id', id.toString());
      let options = new RequestOptions({headers: myHeaders, params: myParams});

      return this.http.get(this.giftsUrl, options)
        .toPromise()
        .then(response => response.json() as GiftDto[]);
    }

    saveGifts(id: number, gifts: GiftDto[]): Promise<boolean> {
      let myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      let myParams = new URLSearchParams();
      myParams.append('id', id.toString());
      let options = new RequestOptions({headers: myHeaders, params: myParams});

      return this.http.post(this.saveGiftsUrl, gifts, options)
        .toPromise()
        .then(response => response.json() as boolean);
    }
}
