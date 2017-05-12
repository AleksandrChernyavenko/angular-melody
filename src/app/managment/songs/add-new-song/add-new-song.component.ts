import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import SongService from "../../../service/SongService";

@Component({
    selector: 'add-new-song',
    styleUrls: ['add-new-song.component.css'],
    templateUrl: 'add-new-song.component.html',
})
export class AddNewSongComponent implements OnInit {

    public name: string;
    public rightVariant: number = 1;
    public variant1: string;
    public variant2: string;
    public variant3: string;
    public variant4: string;


    constructor(public songService: SongService, private router: Router, private route:ActivatedRoute) {
    }

    ngOnInit() {

    }

    sendForm() {

        this.songService.createNewSong(
            this.name,
            this.rightVariant,
            this.variant1,
            this.variant2,
            this.variant3,
            this.variant4,
        )
            .subscribe(
                (res) => {
                    this.router.navigate(['../upload', res.id], {relativeTo: this.route});
                },
                (error: any) => {
                    alert(error.json().message)
                }
            );
    }


}
