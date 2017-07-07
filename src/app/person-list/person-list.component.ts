/**
 * Created by NB-72 on 2017. 07. 06..
 */

import {Component, OnInit} from "@angular/core";
import {PersonService} from "../person-service/person.service";
import {Person} from "../common/Person";
import {Router} from "@angular/router";
@Component({
  templateUrl: 'person-list.component.html',
  styleUrls: ['person-list.component.css']
})
export class PersonListComponent implements OnInit{
  personList: Person[];

  constructor(
    private personService: PersonService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.personList = this.personService.getPersons();
  }

  onSelect(p): void{
    this.router.navigate(['person', p.name])
  }
}
