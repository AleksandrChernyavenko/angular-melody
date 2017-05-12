import {Injectable} from "@angular/core";
import {Http, URLSearchParams, Response, Headers} from '@angular/http';
import {BASE_API_URL} from "../../service/index";


@Injectable()
export default class UserManagementService {

    public baseUrl: string = BASE_API_URL + 'users';

    constructor(private http: Http) {
    }

    getList(opts = {}) {
        let params: URLSearchParams = new URLSearchParams();
        Object.keys(opts).forEach((name) => {
            params.set(name, opts[name]);
        });
        return this.http.get(this.baseUrl, {search: params})
            .map((res) => res.json());
    }


}
