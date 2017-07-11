/**
 * Created by NB-72 on 2017. 07. 06..
 */

import {Injectable} from "@angular/core";
import {Person} from "../common/person";
import {SpecEvent} from "../common/spec-event.";
import {EventItem} from "../event-list/event-item";
import {AuthService} from "./auth.service";

@Injectable()
export class PersonService {
  private personList: Person[] = [
    {id: 1, name: "Anya", events: [{eventType: 'birthday', month: 12, day: 20}]},
    {id: 2, name: "Anya-Apa", events: [{eventType: 'anniversary', month: 6, day: 29}]},
    {id: 3, name: "Tomi", events: [{eventType: 'nameday', month: 7, day: 3}, {eventType: 'birthday', month: 12, day: 12}]},
    {id: 4, name: "Apa", events: [{eventType: 'birthday', month: 1, day: 30}]},
    {id: 5, name: "Kriszti-Laci", events: [{eventType: 'anniversary', month: 8, day: 25}]},
    {id: 6, name: "Lini", events: [{eventType: 'birthday', month: 3, day: 7}]},
    {id: 7, name: "Kriszti", events: [{eventType: 'birthday', month: 10, day: 27}, {eventType: 'nameday', month: 8, day: 5}]}
  ];

  constructor(private authService: AuthService) {}

  getPersons(): Person[] {
    this.order();
    return this.personList;
  }

  getPerson(name: string): Person {
    return this.personList.find(p => p.name === name);
  }

  getEvents() : EventItem[] {
    let events: EventItem[] = [];
    for(let p of this.personList){
      for(let e of p.events){
        events.push(new EventItem(p.name, e.eventType, e.month, e.day));
      }
    }
    return events;
  }

  addNewEvent(name: string, event: SpecEvent): boolean{
    let person = this.personList.find(p => p.name === name);
    if( !person ) {
      this.personList.push(new Person(name, event));
      return true;
    }
    else {
      let eventTemp = person.events.find(e => e.eventType === event.eventType);
      if(eventTemp){
        alert(name + "'s " + event.eventType + " is already in the list: " +
                eventTemp.month + "." + eventTemp.day + ".");
        return false;
      }
      else {
        let text = "There is already a person with name " + name + " in the list, this is the same person?\n";
        for(let e of person.events)
          text += e.month.toString() + "." + e.day.toString() + ". - " + e.eventType + "\n";
        let c = confirm(text);
        if(c) {
          person.events.push(event);
          return true;
        }
        return false;
      }
    }
  }

  deleteEvent(name: string, eventType: string): void {
    if(this.authService.isLogged()){
      let c = confirm("Are you sure you want to delete " + name + "'s " + eventType + "?");
      if (c) {
        let person = this.personList.find(p => p.name === name);
        let event = person.events.find(e => e.eventType === eventType);
        let index = person.events.indexOf(event, 0);
        person.events.splice(index, 1);

        if (!person.events.length)
          this.personList.splice(this.personList.indexOf(person), 1);
      }
    }
    else {
      alert("You have to be logged in as an ADMIN to delete event!");
    }
  }

  deletePerson(person: Person){
    if(this.authService.isLogged()){
      let c = confirm("Are you sure you want to delete " + person.name + " from the list?");
      if (c) {
        this.personList.splice(this.personList.indexOf(person), 1);
      }
    }
    else {
      alert("You have to be logged in as an ADMIN to delete person!")
    }
  }

  order(): void{
    this.personList = this.personList.sort((p1,p2) => {
      if (p1.name.toLowerCase() < p2.name.toLowerCase())
        return -1;
      if (p1.name.toLowerCase() > p2.name.toLowerCase())
        return 1;
      return 0;
    });
  }

}