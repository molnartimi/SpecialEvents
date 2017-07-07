/**
 * Created by NB-72 on 2017. 07. 04..
 */
import { Injectable } from '@angular/core';
import { SpecEvent } from "../common/spec-event.";
import { SortingFilterEnum } from "../common/sorting-filter-enum";

@Injectable()
export class EventService {
  orderBy: SortingFilterEnum = 1;

  eventList: SpecEvent[] = [
    {name: "Anya", eventType: "birthday", month : 12, day : 20},
    {name: "Apa", eventType: "birthday", month : 1, day : 30},
    {name: "Tomi", eventType: "birthday", month : 12, day : 12},
    {name: "Kriszti", eventType: "nameday", month : 8, day : 5},
    {name: "Lini", eventType: "birthday", month : 3, day : 7},
    {name: "Anya-Apa", eventType: "anniversary", month : 6, day: 29},
    {name: "Anya", eventType: "nameday", month: 2, day: 18}
  ];

  getEvents(): SpecEvent[] {
    this.order(this.orderBy);
    return this.eventList;
  }

  addEvent(newEvent: SpecEvent): void {
    this.eventList.push(newEvent);
  }

  order(by: number): void{
    this.orderBy = by;
    switch (this.orderBy){
      case 1:
        this.eventList = this.eventList.sort((e1,e2) => {
          if (e1.month < e2.month ||
            (e1.month == e2.month && e1.day < e2.day) ||
            (e1.month == e2.month && e1.day == e2.day && e1.name.toLowerCase() < e2.name.toLowerCase()))
            return -1;
          if (e1.month > e2.month ||
            (e1.month == e2.month && e1.day > e2.day) ||
            (e1.month == e2.month && e1.day == e2.day && e1.name.toLowerCase() > e2.name.toLowerCase()))
            return 1;
          return 0;
        });
        break;
      case 2:
        this.eventList = this.eventList.sort((e1,e2) => {
          if (e1.name.toLowerCase() < e2.name.toLowerCase() ||
            (e1.name.toLowerCase() === e2.name.toLowerCase() && (e1.month < e2.month ||
            (e1.month == e2.month && e1.day < e2.day))))
            return -1;
          if (e1.name.toLowerCase() > e2.name.toLowerCase() ||
            (e1.name.toLowerCase() === e2.name.toLowerCase() && (e1.month > e2.month ||
            (e1.month == e2.month && e1.day > e2.day))))
            return 1;
          return 0;
        });
        break;
      case 3:
        this.eventList = this.eventList.sort((e1,e2) => {
          if ((e1.eventType === 'birthday' && e2.eventType !== 'birthday') ||
            (e1.eventType !== 'anniversary' && e2.eventType === 'anniversary'))
            return -1;
          if ((e2.eventType === 'birthday' && e1.eventType !== 'birthday') ||
            (e1.eventType === 'anniversary' && e2.eventType !== 'anniversary'))
            return 1;
          return 0;
        });
        break;
    }

  }
}
