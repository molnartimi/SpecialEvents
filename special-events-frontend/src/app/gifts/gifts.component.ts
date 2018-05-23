/**
 * Created by NB-72 on 2017. 07. 10..
 */

import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {GiftDto} from "../common/gift.dto";
import {GiftService} from "../services/gift.service";
import {PersonService} from "../services/person.service";

@Component({
    templateUrl: 'gifts.component.html',
    styleUrls: ['gifts.component.css']
})
export class GiftsComponent implements OnInit {
    id: number;
    name: string;
    gifts: GiftDto[] = [];
    newGift: string = '';

    constructor(private route: ActivatedRoute,
                private personService: PersonService,
                private giftService: GiftService,
                private location: Location) {
    }

    ngOnInit() {
        this.id = Number(this.route.parent.snapshot.paramMap.get('id'));
        this.personService.getPerson(this.id).then(person => this.name = person.name);
        this.giftService.getGifts(this.id).then(gifts => this.gifts = gifts);
    }

    saveGifts(): void {
        this.giftService.saveGifts(this.id, this.gifts);
        this.goBack();
    }

    addGift() {
        this.gifts.push(new GiftDto(0, this.newGift, false));
        this.newGift = "";
    }

    goBack(): void {
        this.location.back();
    }

    deleteGift(idx: number): void {
        this.gifts.splice(idx, 1);
    }
}
