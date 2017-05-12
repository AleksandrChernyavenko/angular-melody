import {Component, OnInit} from '@angular/core';
import GenreService from "../../../service/GenreService";
import {GenreInterface} from "../../../inteface/GenreInterface";

@Component({
    selector: 'genres-list',
    styleUrls: ['genres-list.component.css'],
    templateUrl: 'genres-list.component.html',
})
export class GenresListComponent implements OnInit {
    genres: Array<GenreInterface>;

    constructor(public dateProvider: GenreService) {
    }

    ngOnInit() {
        this.loadData();
    }

    loadData() {
        const params = {
            limit: 100
        };
        this.dateProvider
            .getList(params)
            .subscribe((res) => {
                this.genres = res.rows;
            });
    }

}
