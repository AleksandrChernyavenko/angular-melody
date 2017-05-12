import {Component, OnInit, OnDestroy, Input} from '@angular/core';
import {UserInterface} from "../../../inteface/user.interface";
import {AnswerStatusEnum} from "../../../inteface/AnswerStatusEnum";
import {AwardNamesEnum} from "../../../inteface/AwardNamesEnum";

@Component({
    selector: 'user-list',
    styleUrls: ['user-list.component.css'],
    templateUrl: 'user-list.component.html'
})
export class UserListComponent implements OnInit {

    @Input() users: Array<UserInterface>;
    @Input() currentUserId: number;

    ngOnInit(): void {
    }

    getIconClass(user:UserInterface):string{

        const right = 'glyphicon-ok-sign';
        const wrong = 'glyphicon-remove-sign';
        const waiting = 'glyphicon-hourglass';

        switch (user.answerStatus){
            case AnswerStatusEnum.right:
                return right;
            case AnswerStatusEnum.wrong:
                return wrong;
            case AnswerStatusEnum.waiting:
                return waiting;

        }

    }


    getAwardClass(user:UserInterface):string{
        switch (user.award){
            case AwardNamesEnum.answeredFirst:
                return 'gold';
            case AwardNamesEnum.answeredSecond:
                return 'silver';
            case AwardNamesEnum.answeredThird:
                return 'bronze';
            default:
                return '';

        }

    }




}
