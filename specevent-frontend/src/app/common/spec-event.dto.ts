import {PersonDto} from "./person.dto";

export class SpecEventDto {
    constructor(public id: number,
                public month: number,
                public day: number,
                public eventType: string,
                public persons: PersonDto[]) {}
}