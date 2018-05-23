/**
 * Created by NB-72 on 2017. 07. 06..
 */

import {Injectable} from "@angular/core";
import {Http, RequestOptions, Headers, URLSearchParams} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {PersonDto} from "../common/person.dto";

@Injectable()
export class RsApiService {

    constructor(private http: Http) {}

    public post(url, callback, body?, options?): Promise<any> {
      return this.http.post(url,body ? body : {}, options ? options : null)
        .toPromise()
        .then(response => callback(response));
    }

    public get(url, callback, options?): Promise<any> {
      return this.http.get(url, options ? options : null)
        .toPromise()
        .then(response => callback(response));
    }

    public put(url, callback, body?, options?): Promise<any> {
      return this.http.put(url, body ? body : {}, options ? options : null)
        .toPromise()
        .then(response => callback(response));
    }

    public delete(url, callback, options?): Promise<any> {
      return this.http.delete(url, options ? options : null)
        .toPromise()
        .then( response => callback(response));

    }

    public static createHttpOptions(paramNames: string[], paramValues: string[]): RequestOptions {
      let myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      let myParams = new URLSearchParams();
      for (let i in paramNames) {
        myParams.append(paramNames[i], paramValues[i]);
      }
      return new RequestOptions({headers: myHeaders, params: myParams});
    }

    public static createDefaultHttpOptions(id: string): RequestOptions {
      return this.createHttpOptions(['id'], [id]);
    }
}
