/**
 * Created by NB-72 on 2017. 07. 06..
 */

import {Component, OnInit} from "@angular/core";
import {Router, ActivatedRoute} from '@angular/router';
import 'rxjs/add/operator/switchMap';
import {RsApiService} from "../../services/rs-api.service";
import {Location} from "@angular/common";
import {SpecEventDto} from "../../common/spec-event.dto";
import {PersonDto} from "../../common/person.dto";

@Component({
    templateUrl: 'person-event-list.component.html',
    styleUrls: ['person-event-list.component.css']
})
export class PersonEventListComponent implements OnInit {
    person: PersonDto;
    events: SpecEventDto[];
    valid: boolean;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private rsApiService: RsApiService,
                private location: Location) {
    }

    ngOnInit(): void {
        let id = this.route.snapshot.paramMap.get('id');
        this.rsApiService.getPerson(Number(id)).then(person => this.person = person);
        this.rsApiService.getPersonEvents(Number(id)).then(events => this.events = events);
    }

    goToHints(): void {
       // TODO this.router.navigate(['person', this.events.id, 'gifts']);
    }

    deleteEvent(event: SpecEventDto): void {
        this.rsApiService.deleteEventFromPerson(this.person.id, event.id)
            .then(success => {
                let index = this.events.indexOf(event);
                this.events.splice(index, 1);
            });
    }

    goBack(): void {
        this.location.back();
    }
}
