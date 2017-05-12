import {Injectable} from "@angular/core";
import {Http, URLSearchParams, Response, Headers} from '@angular/http';
import {BASE_API_URL} from "./index";

/**
 * Created by alex on 12.09.16.
 */


@Injectable()
export default class VariantService {

    public baseUrl: string = BASE_API_URL + 'variants';

    constructor(private http: Http) {
    }

    changeName(songId, name) {
        return this.http
            .put(`${this.baseUrl}/${songId}`, {
                name: name,
            });
    }

}
