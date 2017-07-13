/**
 * Created by NB-72 on 2017. 07. 06..
 */

import {Component, EventEmitter, OnInit, Output} from "@angular/core";
import {Person} from "../common/person";
import {Router, ActivatedRoute} from '@angular/router';
import 'rxjs/add/operator/switchMap';
import {PersonService} from "../services/person.service";
import {Location} from "@angular/common";
import {AuthService} from "../services/auth.service";

@Component({
  templateUrl: 'person-events.component.html',
  styleUrls: ['person-events.component.css']
})
export class PersonEventsComponent implements OnInit{
  logged: boolean;
  person: Person;
  settingMode: boolean;
  valid: boolean;

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

    let id = this.route.snapshot.paramMap.get('id');
    this.personService.getPerson(Number(id)).then(person => this.person = person);
    this.settingMode = false;
  }

  onSettingMode(): void {
    if(this.logged)
      this.settingMode = true;
    else
      alert("You have to be logged in as ADMIN to edit events!");
  }

  onSave(event): void {
    setTimeout((() => this.settingMode = false), 500);

    this.person.name = event.name;
    this.person.events = event.events;
  }

  goToHints(): void {
    this.router.navigate(['person', this.person.id, 'gifts']);
  }

  deleteEvent(eventType: string): void {
    this.personService.deleteEvent(this.person.id,eventType);
    if(!this.person.events.length)
      this.router.navigate(['events']);
  }

  goBack(): void {
    this.location.back();
  }
}
