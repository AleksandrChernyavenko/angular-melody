import {trigger, state, animate, style, transition} from '@angular/core';

export function routerTransition() {
    return slideToLeft();
}

function slideToLeft() {
    return trigger('routerTransition', [
        state('void', style({
            visibility:'hidden'

        }) ),
        state('*', style({
            visibility:'visible',

        }) ),
        transition(':enter', [
            style({transform: 'translateX(100%)'}),
            animate('0.8s ease-in-out', style({
                transform: 'translateX(0%)',
                visibility:'visible',

            }))
        ]),
        transition(':leave', [
            style({transform: 'translateX(0%)'}),
            animate('0.8s ease-in-out', style({
                transform: 'translateX(-100%)',
                visibility:'visible',

            }))
        ])
    ]);
}
