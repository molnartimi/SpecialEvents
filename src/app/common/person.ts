import {SpecEvent} from "./spec-event.";
/**
 * Created by NB-72 on 2017. 07. 06..
 */
export class Person {
  static counter: number = 10;
  id: number;
  name: string;
  events: SpecEvent[] = [];

  constructor(
    name: string,
    event?: SpecEvent
  ) {
    this.id = Person.counter++;
    this.name = name;
    if(event)
      this.events.push(event);
  }

}
