import {Component, OnInit} from '@angular/core';
import GenreService from "../../../service/GenreService";
import {GenreInterface} from "../../../inteface/GenreInterface";

@Component({
    selector: 'genre-list',
    styleUrls: ['genre-list.component.css'],
    templateUrl: 'genre-list.component.html',
})
export class GenreListComponent implements OnInit {
    genres: Array<GenreInterface>;
    page: number = 1;
    totalItems: number;

    constructor(public dateProvider: GenreService) {
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
                this.genres = res.rows;
            });
    }


    changeName(song: any) {
        this.dateProvider.changeName(song.id, song.name)
            .subscribe(
                (res) => {
                    song.editing = false;
                },
                (error: any) => {
                    alert(error.json().message)
                }
            );
    }

    removeGenre(id: number) {
        if(confirm('Вы уверенны ?')) {
            this.dateProvider.deleteById(id)
                .subscribe(
                    () => {
                        this.loadData();
                    },
                    (error: any) => {
                        alert(error.json().message)
                    }
                );
        }
    }

    changePage(page: number) {
        this.page = page;
        this.loadData();
    }

}
