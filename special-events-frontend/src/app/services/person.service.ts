import {Injectable} from "@angular/core";
import {RsApiService} from "./rs-api.service";
import {PersonDto} from "../common/person.dto";
import {UserService} from "./user.service";

@Injectable()
export class PersonService {
  private URL = "api/personapi/";
  private ALL_PERSONS = "persons";
  private PERSON = "person";
  private SAVE = "new-person";
  private DELETE = "delete-person";
  private EDIT = "edit-person";

  constructor(private rsApiService: RsApiService,
              private userService: UserService) {}

  getPersons(): Promise<PersonDto[]> {
    let options = RsApiService.createDefaultHttpOptions(this.userService.currentUserId);
    return this.rsApiService.get(
      this.URL + this.ALL_PERSONS,
      function (response) {
        return response.json() as PersonDto[];
      },
      options
    );
  }

  getPerson(id: number): Promise<PersonDto> {
    return this.rsApiService.get(
      this.URL + this.PERSON + "/" + id,
      function (response) {
        return response.json() as PersonDto;
      }
    )
  }

  deletePerson(id: number): Promise<boolean> {
    let options = RsApiService.createDefaultHttpOptions(id.toString());

    return this.rsApiService.delete(
      this.URL + this.DELETE,
      function (response) {
        return response.json() as boolean;
      },
      options
    );
  }

  savePerson(newPerson: PersonDto): Promise<number> {
    let options = RsApiService.createDefaultHttpOptions(this.userService.currentUserId);
    return this.rsApiService.post(
      this.URL + this.SAVE,
      function (response) {
        return response.json() as number;
      },
      newPerson,
      options
    );
  }

  editPerson(person: PersonDto): Promise<boolean> {
    return this.rsApiService.put(
      this.URL + this.EDIT,
      function (response) {
        return response.json() as boolean;
      },
      person
    );
  }
}
