import {Injectable} from "@angular/core";
import UserService from "./UserService";

@Injectable()
export class UserLevelService {

    constructor(public userService: UserService) {
    }


    getNextLevelExperience(): number {

        const {level} = this.userService.currentUser;
        let exp = 100;
        let defaultModifier = 1.05;
        for (let i = 1; i < level; i++) {

            let modifier = defaultModifier;
            if (i > 20) {
                modifier = 1 + (defaultModifier / i);
            }
            exp = Math.round(exp * modifier);

        }

        return exp;
    }

    getNextLevelPercent(): number {
        const nextLevelExperience = this.getNextLevelExperience();
        const {experience} = this.userService.currentUser;
        return Math.round(experience / nextLevelExperience * 100);
    }

}


const LEVEL_NAMES = [
    'Детский лепет',
    'Утренний петух',
    'Птичья ария',
];