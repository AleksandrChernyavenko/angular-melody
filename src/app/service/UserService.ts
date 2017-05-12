import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {BASE_API_URL} from "./index";

@Injectable()
export default class UserService {

    public currentUser: {
        id: number;
        name: string;
        isAdmin: boolean;
        level:number;
        experience:number;
    };

    public baseUrl: string = BASE_API_URL + 'users';

    constructor(private http: Http) {
    }

    loadUser() {
        const promise = this.http.get(`${this.baseUrl}/my`)
            .map((res: Response) => res.json())
            .toPromise();
        promise.then(user => this.currentUser = user);
        return promise;
    }

}
