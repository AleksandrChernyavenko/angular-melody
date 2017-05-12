import {Component, Input} from '@angular/core';

@Component({
    selector: 'circle-timer',
    styleUrls: ['circle-timer.component.css'],
    templateUrl: 'circle-timer.component.html',
})
export class CircleTimerComponent {
    @Input() currentNumber: number;
    @Input() total: number = 20;
    @Input() size: 'big'|'normal'|'small' = 'normal';


    getProgressClass() {
        if (!this.currentNumber) {
            return 'p0';
        }
        let percent = (this.currentNumber / this.total * 100).toFixed(0);
        return `p${percent}`;
    }

}
