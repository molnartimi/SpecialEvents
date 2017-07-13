import {Person} from "../common/person";
import {GiftList} from "./gifts.service";
import {EventTypeEnum} from "../common/event-type-enum";
/**
 * Created by NB-72 on 2017. 07. 12..
 */

export const PERSONS: Person[] = [
  {id: 1, name: "Anya", events: [{eventType: EventTypeEnum.BIRTHDAY, month: 12, day: 20}]},
  {id: 2, name: "Anya-Apa", events: [{eventType: EventTypeEnum.ANNIVERSARY, month: 6, day: 29}]},
  {id: 3, name: "Tomi", events: [{eventType: EventTypeEnum.NAMEDAY, month: 7, day: 3}, {eventType: EventTypeEnum.BIRTHDAY, month: 12, day: 12}]},
  {id: 4, name: "Apa", events: [{eventType: EventTypeEnum.BIRTHDAY, month: 1, day: 30}]},
  {id: 5, name: "Kriszti-Laci", events: [{eventType: EventTypeEnum.ANNIVERSARY, month: 8, day: 25}]},
  {id: 6, name: "Lini", events: [{eventType: EventTypeEnum.BIRTHDAY, month: 3, day: 7}]},
  {id: 7, name: "Kriszti", events: [{eventType: EventTypeEnum.BIRTHDAY, month: 10, day: 27}, {eventType: EventTypeEnum.NAMEDAY, month: 8, day: 5}]}
];

export const GIFTLISTS: GiftList[] = [
  {id: 4, gifts: [{gift: "Fúrógép", done: false}, {gift: "Szerszámos láda", done: true}]},
  {id: 3, gifts: [{gift: "Dechatlonos törülköző", done: true}, {gift: "Pici Biblia", done: false}]},
  {id: 6, gifts: [{gift: "körömlakk készlet", done: false}]}
];
