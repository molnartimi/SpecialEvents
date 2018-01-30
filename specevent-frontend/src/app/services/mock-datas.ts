import {Person} from "../common/person";
import {GiftList} from "./gifts.service";
import {EventTypeEnum} from "../common/event-type-enum";
/**
 * Created by NB-72 on 2017. 07. 12..
 */

export const GIFTLISTS: GiftList[] = [
  {id: 4, gifts: [{gift: "Fúrógép", done: false}, {gift: "Szerszámos láda", done: true}]},
  {id: 3, gifts: [{gift: "Dechatlonos törülköző", done: true}, {gift: "Pici Biblia", done: false}]},
  {id: 6, gifts: [{gift: "körömlakk készlet", done: false}]}
];
