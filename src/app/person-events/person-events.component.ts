/**
 * Created by NB-72 on 2017. 07. 06..
 */

import {Component, OnInit} from "@angular/core";
import {Person} from "../common/person";
import {Router, ActivatedRoute, ParamMap} from '@angular/router';
import 'rxjs/add/operator/switchMap';
import {PersonService} from "../services/person.service";
import {Location} from "@angular/common";
import {SpecEvent} from "../common/spec-event.";
import {AuthService} from "../services/auth.service";

@Component({
  templateUrl: 'person-events.component.html',
  styleUrls: ['person-events.component.css']
})
export class PersonEventsComponent implements OnInit{
  logged: boolean;
  person: Person;
  private settingMode: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private personService: PersonService,
    private authService: AuthService,
    private location: Location
  ) {
    this.logged = authService.isLogged();
  }

  ngOnInit(): void {
    /*this.route.paramMap
      .switchMap((params: ParamMap) => this.personService.getPerson(params.get('name')))
      .subscribe((person: Person) => this.person = person);*/

    let name = this.route.snapshot.paramMap.get('name');
    this.person = this.personService.getPerson(name);
  }

  onSettingMode(): void {
    if(this.logged)
      this.settingMode = true;
    else
      alert("You have to be logged in as ADMIN to edit events!");
  }

  isSettingMode(): boolean {
    return this.settingMode;
  }

  save(): void {
    this.settingMode = false;
  }

  goToHints(): void {
    this.router.navigate(['person', this.person.name, 'gifts']);
  }

  deleteEvent(eventType: string): void {
    this.personService.deleteEvent(this.person.name,eventType);
    if(!this.person.events.length)
      this.router.navigate(['events']);
  }

  goBack(): void {
    this.location.back();
  }
}
