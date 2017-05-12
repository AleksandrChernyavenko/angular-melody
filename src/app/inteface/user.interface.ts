import {AnswerStatusEnum} from "./AnswerStatusEnum";
import {AwardNamesEnum} from "./AwardNamesEnum";
export interface UserInterface {
    id:number;
    vkId:number;
    avatarUrl:string;
    name:string;
    score:number;
    answerStatus:AnswerStatusEnum;
    award:AwardNamesEnum|false;
    addedScore:number|false;
}