import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FileUploader} from "ng2-file-upload";
import GenreService from "../../../service/GenreService";

@Component({
    selector: 'upload-genre-image',
    styleUrls: ['upload-genre-image.component.css'],
    templateUrl: 'upload-genre-image.component.html',
})
export class UploadGenreImageComponent implements OnInit {


    public songId: number;
    public uploader;

    constructor(public genreService: GenreService, private router: Router, private route:ActivatedRoute) {
    }

    ngOnInit() {

        this.route.params
            .map((params) => params['id'])
            .subscribe((songId) => {
                    this.songId = songId;
                    const URL = this.genreService.baseUrl + `/upload/${this.songId}`;
                    const uploader = new FileUploader({url: URL, autoUpload: true});
                    uploader.onCompleteItem = () => {
                       this.router.navigate(['/management/genres']);
                    };
                    this.uploader =  uploader;

            });

    }

}
