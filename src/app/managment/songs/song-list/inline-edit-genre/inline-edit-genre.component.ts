import {Component, Input, ViewEncapsulation} from '@angular/core';
import SongService from "../../../../service/SongService";

@Component({
    selector: 'inline-edit-genre',
    styleUrls: ['inline-edit-genre.component.css'],
    templateUrl: 'inline-edit-genre.component.html',
    encapsulation: ViewEncapsulation.None
})
export class InlineEditGenreComponent {

    public genres = [];
    private SongId;

    @Input() set song(song) {
        this.SongId = song.id;
        if (song && song.Genres) {
            this.genres = song.Genres.map(genre => genre.name);
        }
    };

    @Input() listAvailableGenres = [];

    constructor(public songService: SongService) {
    }

    get listAvailableGenresNames() {
        return this.listAvailableGenres.map((genre) => genre.name);

    }

    onItemRemoved(name) {
        const genre = this.listAvailableGenres.find((genre) => genre.name === name);
        this.songService
            .removeGenre(this.SongId, genre.id)
            .subscribe(
                response => {
                },
                (error) => alert(error),
                () => {
                }
            );
    }

    onItemAdded(name) {
        const genre = this.listAvailableGenres.find((genre) => genre.name === name);
        this.songService
            .addGenre(this.SongId, genre.id)
            .subscribe(
                response => {
                },
                (error) => alert(error),
                () => {
                }
            );
    }

}
