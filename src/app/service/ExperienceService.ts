import {Injectable} from "@angular/core";
import {Http, URLSearchParams, Response, Headers} from '@angular/http';
import {BASE_API_URL} from "./index";
import UserService from "./UserService";
import {UserLevelService} from "./UserLevelService";


@Injectable()
export default class ExperienceService {
    experienceAnimated:boolean = false;

    constructor(public userService:UserService, public userLevelService:UserLevelService) {}

    addExperience(experience:number) {
        this.experienceAnimated = true;
        const nextLevelExperience = this.userLevelService.getNextLevelExperience();
        const expectedExperience = this.userService.currentUser.experience + experience;


        if(expectedExperience >= nextLevelExperience) {
            this.userService.currentUser.level++;
            this.userService.currentUser.experience = expectedExperience - nextLevelExperience;
        }
        else {
            this.userService.currentUser.experience = expectedExperience;
        }
        setTimeout(() => {
            this.experienceAnimated = false;
        },500);
    }
}
