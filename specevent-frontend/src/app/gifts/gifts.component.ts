/**
 * Created by NB-72 on 2017. 07. 10..
 */

import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Gift, GiftsService} from "../services/gifts.service";
import {Location} from "@angular/common";
import {PersonService} from "../services/person.service";

@Component({
    templateUrl: 'gifts.component.html',
    styleUrls: ['gifts.component.css']
})
export class GiftsComponent implements OnInit {
    id: number;
    name: string;
    gifts: Gift[] = [{gift: "alma", done: true}];
    newGift: string = '';

    constructor(private route: ActivatedRoute,
                private giftsService: GiftsService,
                private personService: PersonService,
                private location: Location) {
    }

    ngOnInit() {
        this.id = Number(this.route.snapshot.paramMap.get('id'));
        this.personService.getPerson(this.id).then(person => this.name = person.name);

        this.giftsService.getGifts(this.id).then(gifts => this.gifts = gifts);
    }

    saveNewGift(): void {
        this.giftsService.addGift(this.id, this.newGift);
        this.update();
    }

    goBack(): void {
        this.location.back();
    }

    deleteGift(gift: Gift): void {
        this.giftsService.deleteGift(this.id, gift);
        this.update();
    }

    update(): void {
        this.giftsService.getGifts(this.id).then(gifts => this.gifts = gifts);
        this.newGift = "";
    }
}
