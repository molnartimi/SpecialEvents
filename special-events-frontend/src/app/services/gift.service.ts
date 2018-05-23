import {Injectable} from "@angular/core";
import {GiftDto} from "../common/gift.dto";
import {RsApiService} from "./rs-api.service";
import {Headers, RequestOptions, URLSearchParams} from "@angular/http";

@Injectable()
export class GiftService {
    private URL = "api/giftapi/";
    private ALL_GIFTS = "gifts";
    private SAVE = "save-gifts";

    constructor(private rsApiService: RsApiService) {}

    getGifts(id: number): Promise<GiftDto[]> {
      let options = RsApiService.createDefaultHttpOptions(id.toString());
      return this.rsApiService.get(
        this.URL + this.ALL_GIFTS,
        function(response) {
          return response.json() as GiftDto[];
        },
        options
      );
    }

    saveGifts(id: number, gifts: GiftDto[]): Promise<boolean> {
        let options = RsApiService.createDefaultHttpOptions(id.toString());
        return this.rsApiService.post(
          this.URL + this.SAVE,
          function(response) {
            return response.json() as boolean;
          },
          gifts,
          options
        );
    }
}
