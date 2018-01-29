import {EventTypeEnum} from "./event-type-enum";
/**
 * Created by NB-72 on 2017. 07. 04..
 */

export class SpecEvent {

  constructor(
    public eventType: EventTypeEnum,
    public month: number,
    public day: number
  ) {}
}
