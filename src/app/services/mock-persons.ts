import {Person} from "../common/person";
/**
 * Created by NB-72 on 2017. 07. 12..
 */

export const PERSONS: Person[] = [
  {id: 1, name: "Anya", events: [{eventType: 'birthday', month: 12, day: 20}]},
  {id: 2, name: "Anya-Apa", events: [{eventType: 'anniversary', month: 6, day: 29}]},
  {id: 3, name: "Tomi", events: [{eventType: 'nameday', month: 7, day: 3}, {eventType: 'birthday', month: 12, day: 12}]},
  {id: 4, name: "Apa", events: [{eventType: 'birthday', month: 1, day: 30}]},
  {id: 5, name: "Kriszti-Laci", events: [{eventType: 'anniversary', month: 8, day: 25}]},
  {id: 6, name: "Lini", events: [{eventType: 'birthday', month: 3, day: 7}]},
  {id: 7, name: "Kriszti", events: [{eventType: 'birthday', month: 10, day: 27}, {eventType: 'nameday', month: 8, day: 5}]}
];
