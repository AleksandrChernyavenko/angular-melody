import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import SongService from "../../service/SongService";
import {FileUploader} from "ng2-file-upload";

@Component({
    selector: 'upload-song',
    styleUrls: ['upload-song.component.css'],
    templateUrl: 'upload-song.component.html',
})
export class UploadSongComponent implements OnInit {


    public songId: number;
    public uploader;

    constructor(public songService: SongService, private router: Router, private route:ActivatedRoute) {
    }

    ngOnInit() {

        this.route.params
            .map((params) => params['id'])
            .subscribe((songId) => {
                    this.songId = songId;
                    const URL = this.songService.baseUrl + `/upload/${this.songId}`;
                    const uploader = new FileUploader({url: URL, autoUpload: true});
                    uploader.onCompleteItem = () => {
                       this.router.navigate(['/management']);
                    };
                    this.uploader =  uploader;

            });

    }

}
