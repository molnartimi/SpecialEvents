/**
 * Created by NB-72 on 2017. 07. 06..
 */

import {Component, OnInit} from "@angular/core";
import {Person} from "../common/Person";
import {Router, ActivatedRoute, ParamMap} from '@angular/router';
import 'rxjs/add/operator/switchMap';
import {PersonService} from "../person-service/person.service";

@Component({
  templateUrl: 'person-events.component.html',
  styleUrls: ['person-events.component.css']
})
export class PersonEventsComponent implements OnInit{
  person: Person;
  settingMode: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private personService: PersonService
  ) {}

  ngOnInit(): void {
    /*this.route.paramMap
      .switchMap((params: ParamMap) => this.personService.getPerson(params.get('name')))
      .subscribe((person: Person) => this.person = person);*/

    let name = this.route.snapshot.paramMap.get('name');
    this.person = this.personService.getPerson(name);
  }
}
