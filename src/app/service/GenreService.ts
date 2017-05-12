import {Injectable} from "@angular/core";
import {Http, URLSearchParams, Response, Headers} from '@angular/http';
import {BASE_API_URL} from "./index";


@Injectable()
export default class GenreService {

    public baseUrl: string = BASE_API_URL + 'genres';

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

    deleteById(id:number) {
        return this.http
            .delete(`${this.baseUrl}/${id}`);
    }

    changeName(songId, name) {
        return this.http
            .put(`${this.baseUrl}/${songId}`, {
                name: name,
            });
    }

    /**
     *
     * @param name
     * @returns {Observable<GenreInterface>}
     */
    create(name: string) {
        return this.http
            .post(`${this.baseUrl}/`, {name})
            .map((res) => res.json());
    }


}
