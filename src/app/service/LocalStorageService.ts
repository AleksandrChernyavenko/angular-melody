var localStorage = require('localStorage');

import {Injectable} from "@angular/core";


@Injectable()
export default class LocalStorageService {

    get token():string {
        return localStorage.getItem('token');
    }

    set token(val) {
        localStorage.setItem('token', val);
    }

    clearToken() {
        localStorage.removeItem('token');
    }


}