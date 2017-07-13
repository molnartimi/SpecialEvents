import {EventTypeEnum} from "../common/event-type-enum";
/**
 * Created by NB-72 on 2017. 07. 07..
 */

export class EventItem{
  constructor(
    public id: number,
    public name: string,
    public eventType: EventTypeEnum, 
    public month: number,
    public day: number
  ) {}
}
