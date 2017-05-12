import {Component, OnInit} from '@angular/core';
import GenreService from "../../../service/GenreService";
import {GenreInterface} from "../../../inteface/GenreInterface";
import {ActivatedRoute, Params} from "@angular/router";
import LevelsService from "../service/LevelsService";
import SongService from "../../../service/SongService";

@Component({
    selector: 'levels-list',
    styleUrls: ['levels-list.component.css'],
    templateUrl: 'levels-list.component.html',
    providers: [
        LevelsService,
    ]
})
export class LevelsListComponent implements OnInit {
    levels: Array<any>;
    genreId: number;
    genre: GenreInterface;

    constructor(public route: ActivatedRoute,
                public levelsService: LevelsService,
                public songService: SongService,
                public genreService: GenreService) {
        this.getAutoCompleteSource = this.getAutoCompleteSource.bind(this);
    }

    ngOnInit() {
        this.route.params
            .switchMap((params: Params) => {
                this.genreId = +params['genreId'];
                this.loadGenreName();
                return this.levelsService.getLevelsListByGenre(this.genreId);
            })
            .subscribe((res) => {
                this.levels = res;
            });
    }

    loadGenreName() {
        this.genreService.getList({id: this.genreId})
            .subscribe(
                genre => this.genre = genre.rows.pop(),
                error => alert(error.json().message),
            );
    }

    onAddSong(event, LevelId, autocomplete) {
        if (typeof event === 'object') {
            this.levelsService
                .addSongToLevel(LevelId, event.id)
                .subscribe(
                    () => {
                        const level = this.levels.find((level) => level.id === LevelId);
                        level.Songs.push(event);
                    },
                    error => alert(error.json().message),
                );
        }
    }

    addLevel() {
        this.levelsService
            .addLevel(this.genreId)
            .subscribe(
                (level) => {
                    level.Songs = [];
                    this.levels.push(level);
                },
                error => alert(error.json().message),
            );
    }

    getAutoCompleteSource(word) {
        const searchParams = {
            limit: 25,
            GenreId: this.genreId,
            onlyUnused: true,
            random: true,
        };
        if (word) {
            searchParams['name'] = word;
        }
        return this.songService.getList(searchParams);

    }
}
