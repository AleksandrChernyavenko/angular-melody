import {Injectable} from "@angular/core";
import {Http, URLSearchParams, Response, Headers} from '@angular/http';
import {BASE_API_URL} from "../service/index";
import {Observable} from "rxjs";
import {ILevelPreview} from "./interfaces/ILevelPreview";


@Injectable()
export default class AdventureService {

    constructor(private http: Http) {
    }

    getLevelsList() {
        return this.http.get(BASE_API_URL + 'genres/list-with-progress')
            .map((res) => res.json());
    }


    getLevelsListByGenreId(genreId):Observable<ILevelPreview[]> {
        return this.http.get(BASE_API_URL + `levels/get-list/${genreId}`)
            .map((res) => res.json());
    }


    getLevelInfo(levelId) {
        return this.http.get(BASE_API_URL + `levels/get-info/${levelId}`)
            .map((res) => res.json());
    }

    markLevelAsCompleted(LevelId: number, score: number) {
        return this.http
            .post(BASE_API_URL + `levels/mark-as-completed/${LevelId}`, {
                score: score,
            })
            .map((res) => res.json());
    }

}
