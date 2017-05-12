import {Component} from '@angular/core';

@Component({
    selector: 'management',
    template: `

<ul class="nav nav-pills nav-justified">
    <li class="active" [routerLinkActive]="['active']">
        <a [routerLink]="['songs']">Песни</a>
    </li>
    <li [routerLinkActive]="['active']">
        <a [routerLink]="['genres']">Жанры</a>
    </li>
    <li [routerLinkActive]="['active']">
        <a [routerLink]="['levels']">Уровни</a>
    </li>
    <li [routerLinkActive]="['active']">
        <a [routerLink]="['users']">Пользователи</a>
    </li>
</ul>

<router-outlet></router-outlet>

`
})
export class ManagementComponent {
}
