import {Injectable} from "@angular/core";
import {Http, URLSearchParams, Response, Headers} from '@angular/http';
import {BASE_API_URL} from "../../../service/index";


@Injectable()
export default class LevelsService {

    public baseUrl: string = BASE_API_URL + 'levels';

    constructor(private http: Http) {
    }

    getLevelsListByGenre(genreId: number) {
        return this.http.get(this.baseUrl + `/get-list/${genreId}`)
            .map((res) => res.json());
    }

    addSongToLevel(LevelId: number, SongId: number) {
        return this.http
            .post(`${this.baseUrl}/add-song`, {LevelId, SongId})
            .map((res) => res.json());
    }


    addLevel(GenreId: number) {
        return this.http
            .post(`${this.baseUrl}/add-level-to-genre/${GenreId}`,{})
            .map((res) => res.json());
    }


}
