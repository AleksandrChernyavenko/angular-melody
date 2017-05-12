import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';

@Component({
    selector: 'pagination',
    styleUrls: ['pagination.component.css'],
    templateUrl: 'pagination.component.html',
})
export class PaginationComponent {


    @Input() totalItems: number;
    @Input() currentPage: number = 1;
    @Input() pageSize: number = 10;
    @Output() onPageChange = new EventEmitter<number>();

    public get pages(): Array<number> {
        const pagesCount = this.getPageCount();
        return range(1, pagesCount);
    }

    getPageCount() {
        return Math.ceil(this.totalItems / this.pageSize);
    }

    selectPage(event, number: number) {
        event.preventDefault();
        this.onPageChange.emit(number);
    }

}

function range(start, end) {
    let foo = [];
    for (let i = start; i <= end; i++) {
        foo.push(i);
    }
    return foo;
}
