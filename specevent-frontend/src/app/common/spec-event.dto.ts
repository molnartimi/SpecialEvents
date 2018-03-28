import {EventTypeEnum} from "./event-type-enum";
import {PersonDto} from "./person.dto";

export class SpecEventDto {
    constructor(public id: number,
                public month: number,
                public day: number,
                public type: EventTypeEnum,
                public persons: PersonDto[]) {}
}