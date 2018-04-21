/**
 * Created by NB-72 on 2017. 07. 06..
 */

import {Component, OnInit} from "@angular/core";
import {Router, ActivatedRoute} from '@angular/router';
import 'rxjs/add/operator/switchMap';
import {PersonService} from "../../services/person.service";
import {Location} from "@angular/common";
import {SpecEventDto} from "../../common/spec-event.dto";
import {PersonDto} from "../../common/person.dto";

@Component({
    templateUrl: 'person-events.component.html',
    styleUrls: ['person-events.component.css']
})
export class PersonEventsComponent implements OnInit {
    person: PersonDto;
    events: SpecEventDto[];
    settingMode = false;
    valid: boolean;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private personService: PersonService,
                private location: Location) {
    }

    ngOnInit(): void {
        /*this.route.paramMap
          .switchMap((params: ParamMap) => this.personService.getPerson(params.get('name')))
          .subscribe((person: Person) => this.person = person);*/

        let id = this.route.snapshot.paramMap.get('id');
        this.personService.getPerson(Number(id)).then(person => this.person = person);
        this.personService.getPersonEvents(Number(id)).then(events => this.events = events);
    }

    onSettingMode(): void {
        this.settingMode = true;
    }

    goToHints(): void {
       // TODO this.router.navigate(['person', this.events.id, 'gifts']);
    }

    deleteEvent(eventId: number): void {
       /* TODO this.personService.deleteEvent(eventId)
            .then(() => {
                this.personService.getPerson(this.events.id).then(person => this.events = person)
            });*/
    }

    goBack(): void {
        this.location.back();
    }
}
