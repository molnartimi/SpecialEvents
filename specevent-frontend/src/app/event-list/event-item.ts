/**
 * Created by NB-72 on 2017. 07. 07..
 */

import {EventTypeEnum} from "../common/event-type-enum";

export class EventItem {
    constructor(public id: number,
                public personId: number,
                public name: string,
                public eventType: EventTypeEnum,
                public month: number,
                public day: number) {
    }
}
