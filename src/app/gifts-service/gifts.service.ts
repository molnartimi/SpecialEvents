import {Injectable} from "@angular/core";
import {Person} from "../common/person";
/**
 * Created by NB-72 on 2017. 07. 10..
 */

export class Gift{
  constructor(
    public gift: string,
    public done?: boolean
  ) {
    if(!done){
      done = false;
    }
  }
}

export class GiftList{
  name: string;
  gifts: Gift[] = [];

  constructor(name: string, gift?: Gift){
    this.name = name;
    if(gift)
      this.gifts.push(gift);
  }
}


@Injectable()
export class GiftsService {
  private giftMap: GiftList[] = [
    {name: "Apa", gifts: [{gift: "Fúrógép", done: false}, {gift: "Szerszámos láda", done: true}]},
    {name: "Tomi", gifts: [{gift: "Dechatlonos törülköző", done: true}, {gift: "Pici Biblia", done: false}]},
    {name: "Lini", gifts: [{gift: "körömlakk készlet", done: false}]}
  ];

  getGifts(name: string): Gift[] {
    let list = this.giftMap.find(g => g.name === name);
    if(list)
      return list.gifts;
    else
      return null;
  }

  addGift(name:string, gift: string): void {
    let person = this.giftMap.find(g => g.name === name);
    if(person){
      person.gifts.push(new Gift(gift,false));
    }
    else{
      this.giftMap.push(new GiftList(name,new Gift(gift)));
    }


  }

  deleteGift(name: string, gift: Gift): void {
    this.giftMap.splice(this.giftMap.indexOf(this.giftMap.find(g => g.name === name)),1);
  }
}
