import {Injectable} from "@angular/core";
import {RsApiService} from "./rs-api.service";
import {SpecEventDto} from "../common/spec-event.dto";
import {Headers, RequestOptions, URLSearchParams} from "@angular/http";
import {UserService} from "./user.service";

@Injectable()
export class EventService {
    private URL = "api/eventapi/";
    private ALL_EVENTS = "events";
    private EVENT = "event";
    private SAVE = "new-event";
    private DELETE = "delete-event";
    private DELETE_PERSON_EVENT = "delete-person-event";
    private EDIT = "edit-events";
    private PERSON = "person";

    constructor(private rsApiService: RsApiService,
                private userService: UserService) {}

    getEvents(personFilter?, monthFilter?, typeFilter?): Promise<SpecEventDto[]> {
        let options = RsApiService.createHttpOptions(
          ['id', 'person', 'month', 'type'],
          [this.userService.currentUserId, personFilter ? personFilter : '',
                      monthFilter ? monthFilter.toString() : '', typeFilter ? typeFilter : '']);
        return this.rsApiService.get(
          this.URL + this.ALL_EVENTS,
          function (response) {
            return response.json() as SpecEventDto[];
          },
          options
        );
    }


    getEvent(id: number): Promise<SpecEventDto> {
        return this.rsApiService.get(
          this.URL + this.EVENT + "/" + id,
          function (response) {
            return response.json() as SpecEventDto;
          });
    }


    getPersonEvents(id: number): Promise<SpecEventDto[]> {
        return this.rsApiService.get(
          this.URL + this.PERSON + "/" + id + "/" + this.ALL_EVENTS,
          function (response) {
            return response.json() as SpecEventDto[];
          });
    }


    addNewEvent(event: SpecEventDto): Promise<number> {
        return this.rsApiService.post(
          this.URL + this.SAVE,
          function (response) {
            return response.json() as number;
          },
          event
        );
    }


    deleteEvent(id: number): Promise<boolean> {
        let options = RsApiService.createDefaultHttpOptions(id.toString());

        return this.rsApiService.delete(
          this.URL + this.DELETE,
          function (response) {
            return response.json() as boolean;
          },
          options
        );
    }


    deleteEventFromPerson(personId: number, id: number): Promise<boolean> {
        let options = RsApiService.createHttpOptions(
          ['id', 'personId'],
          [id.toString(), personId.toString()]
        );

        return this.rsApiService.delete(
          this.URL + this.DELETE_PERSON_EVENT,
          function (response) {
            return response.json() as boolean;
          },
          options
        );
    }


    editEvents(events: SpecEventDto[]): Promise<boolean> {
        return this.rsApiService.put(
          this.URL + this.EDIT,
          function (response) {
            return response.json() as boolean;
          },
          events
        );
    }
}
