import {Component, OnInit} from '@angular/core';
import UserManagementService from "./UserManagementService";

@Component({
    selector: 'users',
    styleUrls: ['users.component.css'],
    templateUrl: 'users.component.html',
})
export class UsersComponent implements OnInit {
    users: Array<any>;
    page: number = 1;
    totalItems: number;

    constructor(public dateProvider: UserManagementService) {
    }

    ngOnInit() {
        this.loadData();
    }

    loadData() {
        const params = {
            page: this.page
        };
        this.dateProvider
            .getList(params)
            .subscribe((res) => {
                this.totalItems = res.count;
                this.users = res.rows;
            });
    }

    changePage(page: number) {
        this.page = page;
        this.loadData();
    }

}
