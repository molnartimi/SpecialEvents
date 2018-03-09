/**
 * Created by NB-72 on 2017. 07. 06..
 */

import {Component, OnInit} from "@angular/core";
import {Person} from "../../common/person";
import {Router, ActivatedRoute} from '@angular/router';
import 'rxjs/add/operator/switchMap';
import {PersonService} from "../../services/person.service";
import {Location} from "@angular/common";

@Component({
    templateUrl: 'person-events.component.html',
    styleUrls: ['person-events.component.css']
})
export class PersonEventsComponent implements OnInit {
    person: Person;
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
    }

    onSettingMode(): void {
        this.settingMode = true;
    }

    onSave(event): void {
        setTimeout((() => this.settingMode = false), 500);

        this.person.name = event.name;
        this.person.events = event.events;
    }

    goToHints(): void {
        this.router.navigate(['person', this.person.id, 'gifts']);
    }

    deleteEvent(eventId: number): void {
        this.personService.deleteEvent(eventId)
            .then(() => {
                this.personService.getPerson(this.person.id).then(person => this.person = person)
            });
    }

    goBack(): void {
        this.location.back();
    }
}
