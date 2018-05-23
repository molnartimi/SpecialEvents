import {Injectable} from "@angular/core";
import {GiftDto} from "../common/gift.dto";
import {RsApiService} from "./rs-api.service";

@Injectable()
export class GiftService {
    private URL = "api/giftapi";
    private ALL_GIFTS = "gifts";
    private SAVE = "save-gifts";
    
    constructor(private rsApiService: RsApiService) {}

    getGifts(id: number): Promise<GiftDto[]> {
        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        let myParams = new URLSearchParams();
        myParams.append('id', id.toString());
        let options = new RequestOptions({headers: myHeaders, params: myParams});

        return this.http.get(this.giftsUrl, options)
            .toPromise()
            .then(response => response.json() as GiftDto[]);
    }

    saveGifts(id: number, gifts: GiftDto[]): Promise<boolean> {
        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        let myParams = new URLSearchParams();
        myParams.append('id', id.toString());
        let options = new RequestOptions({headers: myHeaders, params: myParams});

        return this.http.post(this.saveGiftsUrl, gifts, options)
            .toPromise()
            .then(response => response.json() as boolean);
    }
}