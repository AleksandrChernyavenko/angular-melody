import {
    Component, Input, trigger, transition, style, animate, keyframes,
    Output, EventEmitter, state
} from '@angular/core';

const animationFactory = (index: number) => {

    const indexDelay = index * 200;
    return trigger(
        `variant${index}`,
        [
            transition(':enter', [
                animate(600 + indexDelay, keyframes([
                    style({opacity: 0, transform: 'translate(-1500px,0px)', offset: 0}),
                    style({opacity: 1, transform: 'translate(30px,0px)', offset: 0.6}),
                    style({opacity: 1, transform: 'translate(-10px,0px)', offset: 0.8}),
                    style({opacity: 1, transform: 'translate(0px,0px)', offset: 1.0})
                ]))
            ]),

            transition(':leave', [
                animate(1200 - indexDelay, keyframes([
                        style({opacity: 1, transform: 'translate(0px,0px)', offset: 0}),
                        style({opacity: 1, transform: 'translate(10px,0px)', offset: 0.6}),
                        style({opacity: 1, transform: 'translate(-30px,0px)', offset: 0.8}),
                        style({opacity: 0, transform: 'translate(1500px,0px)', offset: 1.0}),
                ]))
            ])

        ]
    )
};


@Component({
    selector: 'quiz-variants',
    styleUrls: ['quiz-variants.component.css'],
    templateUrl: 'quiz-variants.component.html',
    animations: [
        animationFactory(1),
        animationFactory(2),
        animationFactory(3),
        animationFactory(4),
        trigger('answer', [

            state('success',
                style({ 'background-color': '#5cb85c', 'border-color': '#4cae4c' })
            ),
            state('error',
                style({ 'background-color': '#c9302c', 'border-color': '#ac2925' })
            ),
        ])
    ],

})
export class QuizVariantsComponent {

    @Input() variants: Array<{id: number,name: string}>;
    @Output() onVariantChoose = new EventEmitter<number>();


    chooseVariant(variantId: number) {
        this.onVariantChoose.emit(variantId);
        return false;
    }

    getVariantState(variant) {
        return variant.state;
    }

}
