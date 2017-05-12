import {Injectable} from "@angular/core";
import {Http, URLSearchParams, Response, Headers} from '@angular/http';
import {BASE_API_URL} from "./index";

/**
 * Created by alex on 12.09.16.
 */


@Injectable()
export default class SongService {

    public baseUrl: string = BASE_API_URL + 'songs';

    constructor(private http: Http) {
    }

    getList(opts = {}) {
        let params: URLSearchParams = new URLSearchParams();
        Object.keys(opts).forEach((name) => {
            if(opts[name] !== undefined) {
                params.set(name, opts[name]);
            }
        });
        return this.http.get(this.baseUrl, {search: params})
            .map((res) => res.json());
    }

    selectRightVariant(songId, RightVariantId) {
        return this.http
            .put(`${this.baseUrl}/${songId}`, {
                RightVariantId: RightVariantId,
            });
    }

    changeSongName(songId, name) {
        return this.http
            .put(`${this.baseUrl}/${songId}`, {
                name: name,
            });
    }

    createNewSong(name: string, rightVariant: number, variant1: string, variant2: string, variant3: string, variant4: string) {
        return this.http
            .post(`${this.baseUrl}/`, {
                name,
                rightVariant,
                variant1,
                variant2,
                variant3,
                variant4,
            })
            .map((res) => res.json());
    }

    removeGenre(SongId: number, GenreId: number) {
        return this.http
            .post(`${this.baseUrl}/remove-genre`, {
                SongId,
                GenreId,
            });
    }


    addGenre(SongId: number, GenreId: number) {
        return this.http
            .post(`${this.baseUrl}/add-genre`, {
                SongId,
                GenreId,
            });
    }


}
