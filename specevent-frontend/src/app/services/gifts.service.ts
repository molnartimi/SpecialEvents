import {Injectable} from "@angular/core";
import {GIFTLISTS} from "./mock-datas"

/**
 * Created by NB-72 on 2017. 07. 10..
 */

export class Gift {
    constructor(public gift: string,
                public done?: boolean) {
        if (!done) {
            done = false;
        }
    }
}

export class GiftList {
    id: number;
    gifts: Gift[] = [];

    constructor(id: number, gift?: Gift) {
        this.id = id;
        if (gift)
            this.gifts.push(gift);
    }
}


@Injectable()
export class GiftsService {
    private giftMap: GiftList[] = GIFTLISTS;

    getGifts(id: number): Promise<Gift[]> {
        let list = this.giftMap.find(g => g.id == id);
        if (list)
            return Promise.resolve(list.gifts);
        else
            return Promise.resolve(null);
    }

    addGift(id: number, gift: string): void {
        let person = this.giftMap.find(g => g.id == id);
        if (person) {
            person.gifts.push(new Gift(gift, false));
        }
        else {
            this.giftMap.push(new GiftList(id, new Gift(gift)));
        }
    }

    deleteGift(id: number, gift: Gift): void {
        let list = this.giftMap.find(l => l.id === id);
        list.gifts.splice(list.gifts.indexOf(gift), 1);
    }

    deletePerson(id: number): void {
        this.giftMap.splice(this.giftMap.indexOf(this.giftMap.find(l => l.id === id)), 1);
    }
}
