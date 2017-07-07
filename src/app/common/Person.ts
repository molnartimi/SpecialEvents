import {SpecEvent} from "./spec-event.";
/**
 * Created by NB-72 on 2017. 07. 06..
 */
export class Person {
  events: SpecEvent[] = [];
  presents: string[] = [];

  constructor(
    public name: string,
    public event?: SpecEvent,
  ) {
    this.events.push(event);
  }
}
