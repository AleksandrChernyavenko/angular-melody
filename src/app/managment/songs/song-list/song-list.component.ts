import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import SongService from "../../../service/SongService";
import VariantService from "../../../service/VariantService";
import GenreService from "../../../service/GenreService";

@Component({
    selector: 'song-list',
    styleUrls: ['song-list.component.css'],
    templateUrl: 'song-list.component.html',
})
export class SongListComponent implements OnInit {
    songs: Array<any>;
    limit: number = 10;
    page: number = 1;
    totalItems: number;
    listAvailableGenres = [];
    loading:boolean = true;
    selectedGenreId;

    constructor(public songService: SongService,
                public variantService: VariantService,
                private route: ActivatedRoute,
                private genreService: GenreService,) {
    }

    ngOnInit() {
        this.loadAvailableGenres();
        this.getNewSongs();
    }

    getNewSongs() {
        this.loading = true;
        const params = {
            page: this.page,
            limit: this.limit,
            GenreId: this.selectedGenreId ? this.selectedGenreId : undefined,
        };
        this.songService
            .getList(params)
            .subscribe((res) => {
                this.loading = false;
                this.totalItems = res.count;
                this.songs = res.rows;
            });
    }

    selectVariant(songId, variantId) {
        this.songService.selectRightVariant(songId, variantId)
            .subscribe(
                (res) => {
                    this.songs.find((song) => song.id === songId).RightVariantId = variantId;
                },
                (error: any) => {
                    alert(error.json().message)
                }
            );
    }

    changeSongName(song: any) {
        this.songService.changeSongName(song.id, song.name)
            .subscribe(
                (res) => {
                    song.editing = false;
                },
                (error: any) => {
                    alert(error.json().message)
                }
            );
    }

    changeVariantName(variant: any) {
        this.variantService.changeName(variant.id, variant.name)
            .subscribe(
                (res) => {
                    variant.editing = false;
                },
                (error: any) => {
                    alert(error.json().message)
                }
            );
    }

    changePage(page: number) {
        this.page = page;
        this.getNewSongs();
    }

    loadAvailableGenres() {
        this.genreService
            .getList({limit: 1000})
            .subscribe(
                (res) => {
                    this.listAvailableGenres = res.rows;
                },
                (error) => {
                    alert(error);
                }
            );
    }

}
