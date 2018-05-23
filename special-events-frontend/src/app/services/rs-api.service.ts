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
    private personsUrl = "api/persons";
    private personUrl = "api/person";
    private newPersonUrl = "api/new-person";
    private deletePersonUrl = "api/delete-person";
    private editPersonNameUrl = "api/edit-person";

    constructor(private http: Http) {}

    public post(url, callback, body?, options?): Promise<any> {
      return this.http.post(url,body ? body : {}, options ? options : null)
        .toPromise()
        .then(response => callback(response));
    }

    public get(url, callback, options?): Promise<any> {
      return this.http.get(url, options ? options : null)
        .toPromise()
        .then(response => callback(response));
    }

    public put(url, callback, body?, options?): Promise<any> {
      return this.http.put(url, body ? body : {}, options ? options : null)
        .toPromise()
        .then(response => callback(response));
    }

    public delete(url, callback, options?): Promise<any> {
      return this.http.delete(url, options ? options : null)
        .toPromise()
        .then( response => callback(response));

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

    deletePerson(id: number): Promise<boolean> {
        let options = this.createDefaultHttpOptions(id.toString());

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
