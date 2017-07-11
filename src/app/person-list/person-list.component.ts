/**
 * Created by NB-72 on 2017. 07. 06..
 */

import {Component, OnInit} from "@angular/core";
import {PersonService} from "../services/person.service";
import {Person} from "../common/person";
import {Router} from "@angular/router";
@Component({
  templateUrl: 'person-list.component.html',
  styleUrls: ['person-list.component.css']
})
export class PersonListComponent implements OnInit{
  personList: Person[];
  private deleted: boolean = false;

  constructor(
    private personService: PersonService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.personList = this.personService.getPersons();
  }

  onSelect(p): void{
    if(!this.deleted)
      this.router.navigate(['person', p.name]);
    else
      this.deleted = false;
  }

  goToHints(person: Person): void {
    this.router.navigate(['person', person.name, 'gifts']);
  }

  deletePerson(person: Person){
    this.deleted = true;
    this.personService.deletePerson(person);
  }
}
