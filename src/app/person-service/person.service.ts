/**
 * Created by NB-72 on 2017. 07. 06..
 */

import {Injectable} from "@angular/core";
import {Person} from "../common/Person";
import {EventService} from "../event-service/event.service";
import {SpecEvent} from "../common/spec-event.";

@Injectable()
export class PersonService {
  personList: Person[] = [];

  constructor(private eventService: EventService) {
    for(let event of eventService.getEvents()){
      this.addByEvent(event);
    }
  }

  getPersons(): Person[] {
    this.order();
    return this.personList;
  }

  getPerson(name: string): Person {
    return this.personList.find(p => p.name === name);
  }

  addByEvent(event: SpecEvent): void{
    let person = this.personList.find(p => p.name === event.name);
    if( !person )
      this.personList.push(new Person(event.name,event));
    else
      person.events.push(event);
  }

  order(): void{
    this.personList = this.personList.sort((p1,p2) => {
      if (p1.name < p2.name)
        return -1;
      if (p1.name > p2.name)
        return 1;
      return 0;
    });
  }

}
