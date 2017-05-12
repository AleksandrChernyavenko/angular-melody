import {Component, Input} from '@angular/core';

@Component({
    selector: 'loading',
    styleUrls: ['loading.component.css'],
    templateUrl: 'loading.component.html',
})
export class LoadingComponent {
    @Input() loading: boolean = true;
    @Input() text: string = 'Загрузка данных...';
}
