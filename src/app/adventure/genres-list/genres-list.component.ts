import {Component, OnInit} from '@angular/core';
import AdventureService from "../AdventureService";
import {LevelPreviewInterface} from "../interfaces/LevelPreviewInterface";
import {Router, ActivatedRoute} from "@angular/router";
import {routerTransition} from "../router.animations";

@Component({
    selector: 'adventure-list',
    animations: [routerTransition()],
    host: {'[@routerTransition]': ''},
    styleUrls: ['genres-list.component.css'],
    templateUrl: 'genres-list.component.html',
})
export class GenresListComponent implements OnInit {

    loading: boolean = true;
    levels: LevelPreviewInterface[] = [];

    constructor(public adventureService: AdventureService, private router: Router, private route: ActivatedRoute) {

    }

    ngOnInit(): void {
        this.adventureService.getLevelsList()
            .subscribe(
                (levels) => {
                    this.loading = false;
                    this.levels = levels;
                },
                (error) => {
                    this.loading = false;
                    alert(error);
                }
            )
    }

    calculateCompletedPercent(level: LevelPreviewInterface) {
        const percent = ((level.doneLevelCount / level.levelCount) * 100).toFixed(2);
        return parseFloat(percent) || 0;
    }


    goToLevels(level: LevelPreviewInterface) {
        this.router.navigate(['../levels-list', level], {relativeTo: this.route});
    }
}
