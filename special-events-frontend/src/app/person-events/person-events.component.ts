import {Component, OnInit} from "@angular/core";
import {Location} from "@angular/common";
import {PersonDto} from "../common/person.dto";
import {RsApiService} from "../services/rs-api.service";
import {SpecEventDto} from "../common/spec-event.dto";
import {ActivatedRoute, Router} from "@angular/router";
import {EventService} from "../services/event.service";

@Component({
    templateUrl: 'person-events.component.html',
    styleUrls: ['person-events.component.css']
})
export class PersonEventsComponent implements OnInit{
  id: number;
  person: PersonDto;
  events: SpecEventDto[];

  constructor(private route: ActivatedRoute,
              protected router: Router,
              protected rsApiService: RsApiService,
              protected eventService: EventService,
              private location: Location) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id') || this.route.parent.snapshot.paramMap.get('id'));
    this.load();
  }

  goBack(): void {
    this.location.back();
  }

  load(): void {
    this.rsApiService.getPerson(this.id).then(person => this.person = person);
    this.eventService.getPersonEvents(this.id).then(events => this.events = events);
  }
}
