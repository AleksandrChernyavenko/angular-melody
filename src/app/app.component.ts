import {Component, trigger, state, style, transition, animate} from '@angular/core';
import UserService from "./service/UserService";
import {UserLevelService} from "./service/UserLevelService";
import ExperienceService from "./service/ExperienceService";


@Component({
    selector: 'app',
    styleUrls: ['app.component.css'],
    templateUrl: './app.component.html',
    animations: [
        trigger('experienceIncrease', [
            state('up', style({
                backgroundColor: '#126ebd',
                transform: 'scale(1.3)'
            })),
            transition('* => up', animate('100ms ease-in')),
        ]),
    ]
})
export class AppComponent {

    constructor(public userService: UserService, public userLevelService:UserLevelService, public experienceService:ExperienceService) {
    }


    exp(){
        this.experienceService.addExperience(10);
    }

    getExperienceState() {
        return this.experienceService.experienceAnimated ? 'up' : '';
    }

    get isAdmin(): boolean {
        return this.userService.currentUser.isAdmin;
    }


    get currentUser() {
        return this.userService.currentUser;
    }

    get nextLevelExperience():number {
        return this.userLevelService.getNextLevelExperience();
    }


    get nextLevelPercent():number {
        return this.userLevelService.getNextLevelPercent();
    }

}
