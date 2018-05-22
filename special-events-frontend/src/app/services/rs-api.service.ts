/**
 * Created by NB-72 on 2017. 07. 06..
 */

import {Injectable} from "@angular/core";
import {Http, RequestOptions, Headers, URLSearchParams} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {PersonDto} from "../common/person.dto";
import {SpecEventDto} from "../common/spec-event.dto";
import {GiftDto} from "../common/gift.dto";
import {UserDto} from "../common/user.dto";

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
    private loginUrl = "api/login";
    private logoutUrl = "api/logout";
    private registrateUrl = "api/register";
    private getUsersUrl = "api/users";
    private deleteUserUrl = "api/delete-user";
    private editUserUrl = "api/edit-user";
    private userUrl = "api/user";

    constructor(private http: Http) {}

    get authenticated(): boolean {
      return !!localStorage.getItem("currentUser")
    }

    get isAdmin(): boolean {
      return JSON.parse(localStorage.getItem('currentUser')).role === "ADMIN";
    }

    public login(user: UserDto): Promise<any> {

        let headers = new Headers();
        headers.append('Accept', 'application/json')
        let base64Credential: string = btoa( user.username+ ':' + user.password);
        headers.append("Authorization", "Basic " + base64Credential);

        let options = new RequestOptions();
        options.headers=headers;

        return this.http.get(this.loginUrl ,  options)
            .toPromise()
            .then(response => {
                let user = response.json().principal;
                if (user) {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
            });
    }

    logout(): Promise<any> {
        return this.http.post(this.logoutUrl,{})
            .toPromise()
            .then(response => {
                localStorage.removeItem('currentUser');
            })
    }

    createAccount(user: UserDto): Promise<any> {
        return this.http.post(this.registrateUrl, user)
          .toPromise()
          .then(response => {
            if (response) {
              this.login(user);
            }
          })
    }

    getPersons(): Promise<PersonDto[]> {
        let options = this.createDefaultHttpOptions(this.currentUserId);
        return this.http.get(this.personsUrl, options)
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

    getUser(id: number): Promise<UserDto> {
      return this.http.get(this.userUrl + "/" + id)
        .toPromise()
        .then(response => response.json() as UserDto);
    }

    getPersonEvents(id: number): Promise<SpecEventDto[]> {
        let url = this.personUrl + '/' + id + '/events';
        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as SpecEventDto[]);
    }

    getEvents(): Promise<SpecEventDto[]> {
        let options = this.createDefaultHttpOptions(this.currentUserId);
        return this.http.get(this.eventsUrl, options)
            .toPromise()
            .then(response => response.json() as SpecEventDto[]);
    }

    addNewEvent(event: SpecEventDto): Promise<number> {
        return this.http.post(this.newEventUrl, event)
            .toPromise()
            .then( response => response.json() as number);
    }

    deleteEvent(id: number): Promise<boolean> {
        let options = this.createDefaultHttpOptions(id.toString());

        return this.http.delete(this.deleteEventUrl, options)
            .toPromise()
            .then( response => response.json() as boolean);
    }

    deleteEventFromPerson(personId: number, id: number): Promise<boolean> {
        let options = this.createHttpOptions(['id', 'personId'], [id.toString(), personId.toString()]);

        return this.http.delete(this.deleteEventFromPersonUrl, options)
            .toPromise()
            .then( response => response.json() as boolean);
    }

    deletePerson(id: number): Promise<boolean> {
        let options = this.createDefaultHttpOptions(id.toString());

        return this.http.delete(this.deletePersonUrl, options)
            .toPromise()
            .then( response => response.json() as boolean);

    }

    deleteUser(id: number): Promise<boolean> {
        let options = this.createDefaultHttpOptions(id.toString());

        return this.http.delete(this.deleteUserUrl, options)
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
        let options = this.createDefaultHttpOptions(this.currentUserId);
        return this.http.post(this.newPersonUrl, newPerson, options)
            .toPromise()
            .then( response => response.json() as number);
    }

    editPerson(person: PersonDto): Promise<boolean> {
      return this.http.put(this.editPersonNameUrl, person)
        .toPromise()
        .then(response => response.json() as boolean);
    }

    editUser(user: UserDto): Promise<boolean> {
        return this.http.put(this.editUserUrl, user)
          .toPromise()
          .then(response => response.json() as boolean);
    }

    editEvents(events: SpecEventDto[]): Promise<boolean> {
      return this.http.put(this.editEventsUrl, events)
        .toPromise()
        .then(response => response.json() as boolean);
    }

    getGifts(id: number): Promise<GiftDto[]> {
      let options = this.createDefaultHttpOptions(id.toString());

      return this.http.get(this.giftsUrl, options)
        .toPromise()
        .then(response => response.json() as GiftDto[]);
    }

    saveGifts(id: number, gifts: GiftDto[]): Promise<boolean> {
      let options = this.createDefaultHttpOptions(id.toString());

      return this.http.post(this.saveGiftsUrl, gifts, options)
        .toPromise()
        .then(response => response.json() as boolean);
    }

    getUsers(): Promise<UserDto[]> {
      return this.http.get(this.getUsersUrl)
        .toPromise()
        .then(response => response.json() as UserDto[]);
    }

    private createHttpOptions(paramNames: string[], paramValues: string[]): RequestOptions {
      let myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      let myParams = new URLSearchParams();
      for (let i in paramNames) {
        myParams.append(paramNames[i], paramValues[i]);
      }
      return new RequestOptions({headers: myHeaders, params: myParams});
    }

    private createDefaultHttpOptions(id: string): RequestOptions {
      return this.createHttpOptions(['id'], [id]);
    }

    public get currentUserId(): string {
      return JSON.parse(localStorage.getItem('currentUser')).id.toString();
    }
}
