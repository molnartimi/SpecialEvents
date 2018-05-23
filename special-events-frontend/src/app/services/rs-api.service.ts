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
    private loginUrl = "api/login";
    private logoutUrl = "logout";
    private registrateUrl = "api/register";

    private authenticatedFlag = false;

    constructor(private http: Http) {}

    get authenticated(): boolean {
      return !!localStorage.getItem("currentUser")
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
                    this.authenticatedFlag = true;
                }
            });
    }

    logout(): Promise<any> {
        return this.http.post(this.logoutUrl,{})
            .toPromise()
            .then(response => {
                localStorage.removeItem('currentUser');
                this.authenticatedFlag = false;
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
}
