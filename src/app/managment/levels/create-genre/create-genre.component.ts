import {Component} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import GenreService from "../../../service/GenreService";

@Component({
    selector: 'create-genre',
    styleUrls: ['create-genre.component.css'],
    templateUrl: 'create-genre.component.html',
})
export class CreateGenreComponent {

    public name: string;

    constructor(public genreService: GenreService, private router: Router, private route: ActivatedRoute) {}

    sendForm() {
        console.log('this.name',this.name);
        this.genreService.create(this.name)
            .subscribe(
                () => {
                    this.router.navigate(['../list'], {relativeTo: this.route});
                },
                (error: any) => {
                    alert(error.json().message)
                }
            );
    }


}
