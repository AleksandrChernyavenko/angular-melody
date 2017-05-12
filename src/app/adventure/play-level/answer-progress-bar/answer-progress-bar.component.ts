import {Component, Input} from '@angular/core';


@Component({
    selector: 'answer-progress-bar',
    styleUrls: ['answer-progress-bar.component.css'],
    templateUrl: 'answer-progress-bar.component.html'
})
export class AnswerProgressBarComponent {

    @Input() totalCount: number;
    @Input() answersList: Array<boolean> = [];


    getItems() {
        const extraAnswers = new Array(this.totalCount - this.answersList.length).fill(null);
        return this.answersList.concat(extraAnswers);
    }

}
