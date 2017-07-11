/**
 * Created by NB-72 on 2017. 07. 10..
 */

import {Component, OnInit} from "@angular/core";
import {Person} from "../common/person";
import {ActivatedRoute, Router} from "@angular/router";
import {PersonService} from "../person-service/person.service";
import {Gift, GiftsService} from "../gifts-service/gifts.service";
import {Location} from "@angular/common";

@Component({
  templateUrl: 'gifts.component.html',
  styleUrls: ['gifts.component.css']
})
export class GiftsComponent implements OnInit{
  name: string;
  logged: boolean = false;
  wrongpwd: boolean = false;
  pwd: string;
  gifts: Gift[] = [{gift: "alma", done: true}];
  newGift: string = '';

  constructor(
    private route: ActivatedRoute,
    private giftsService: GiftsService,
    private location: Location
  ) {}

  ngOnInit() {
    this.name = this.route.snapshot.paramMap.get('name');

    this.gifts = this.giftsService.getGifts(this.name);
  }

  saveNewGift(): void{
    this.giftsService.addGift(this.name,this.newGift);
    this.update();
  }

  goBack(): void {
    this.location.back();
  }

  deleteGift(gift: Gift): void {
    this.giftsService.deleteGift(this.name,gift);
    this.update();
  }

  update(): void {
    this.gifts = this.giftsService.getGifts(this.name);
    this.newGift = "";
  }

  login() {
    if ((this.gifts === null && this.giftsService.checkAdminPasswd(this.pwd)) ||
    (this.gifts !== null && this.giftsService.checkPasswd(this.name, this.pwd)))
      this.logged = true;
    else
      this.wrongpwd = true;
  }
}
