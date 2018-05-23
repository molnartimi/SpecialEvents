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
import {PersonEventsComponent} from "../person-events.component";

@Component({
    selector: 'app-person-events',
    templateUrl: 'person-event-list.component.html',
    styleUrls: ['person-event-list.component.css']
})
export class PersonEventListComponent extends PersonEventsComponent{
    person: PersonDto;
    events: SpecEventDto[];

    goToHints(): void {
       this.router.navigate(['person', this.id, 'gifts']);
    }

    deleteEvent(event: SpecEventDto): void {
        this.eventService.deleteEventFromPerson(this.person.id, event.id)
            .then(success => {
                let index = this.events.indexOf(event);
                this.events.splice(index, 1);
            });
    }

    editPerson(): void {
      this.router.navigate(['person', this.id, "edit"]);
    }
}
