/**
 * Created by NB-72 on 2017. 07. 04..
 */

import {EventTypeEnum} from "./event-type-enum";

export class SpecEvent {
    id: number;
    
    constructor(public name: string,
                public eventType: EventTypeEnum,
                public month: number,
                public day: number) {
    }
}
