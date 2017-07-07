import {SpecEvent} from "./spec-event.";
/**
 * Created by NB-72 on 2017. 07. 06..
 */
export class Person {
  name: string;
  events: SpecEvent[] = [];

  constructor(
    name: string,
    event?: SpecEvent
  ) {
    this.name = name;
    this.events.push(event);
  }

}
