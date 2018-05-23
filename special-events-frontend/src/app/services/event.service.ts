import {Injectable} from "@angular/core";
import {RsApiService} from "./rs-api.service";
import {SpecEventDto} from "../common/spec-event.dto";

@Injectable()
export class EventService {
    private URL = "api/eventapi";
    private ALL_EVENTS = "events";
    private EVENT = "event";
    private SAVE = "new-event";
    private DELETE = "delete-event";
    private DELETE_PERSON_EVENT = "delete-person-event";
    private EDIT = "edit-events";
    
    constructor(private rsApiService: RsApiService) {}

    getEvents(): Promise<SpecEventDto[]> {
        return this.http.get(this.eventsUrl)
            .toPromise()
            .then(response => response.json() as SpecEventDto[]);
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


    editEvents(events: SpecEventDto[]): Promise<boolean> {
        return this.http.put(this.editEventsUrl, events)
            .toPromise()
            .then(response => response.json() as boolean);
    }
}