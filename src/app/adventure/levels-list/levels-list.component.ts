import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {routerTransition} from "../router.animations";
import AdventureService from "../AdventureService";
import {ILevelPreview} from "../interfaces/ILevelPreview";

@Component({
    selector: 'levels-list',
    animations: [routerTransition()],
    host: {'[@routerTransition]': ''},
    styleUrls: ['./levels-list.component.css'],
    templateUrl: './levels-list.component.html',
})
export class LevelsListComponent implements OnInit {


    levelList: Array<ILevelPreview>;
    genreId: number;
    levelName: string;
    loading: boolean = true;

    constructor(private route: ActivatedRoute, private router: Router, private adventureService: AdventureService) {
    }

    ngOnInit() {
        this.route.params
            .switchMap((level: any) => {
                this.levelName = level.name;
                this.genreId = parseInt(level.id);
                return this.adventureService.getLevelsListByGenreId(this.genreId);
            })
            .subscribe(
                (levels) => {
                    this.levelList = levels;
                    this.loading = false;
                },
                (error) => {
                    this.loading = false;
                    alert(error);
                }
            );
    }


    onClick(level: ILevelPreview) {
        if (this.isDone(level) || this.isNextLevel(level)) {
            this.router.navigate(['../play-level', level.id], {relativeTo: this.route});
        }
    }

    getCssClass(level: ILevelPreview) {
        if (this.isDone(level)) {
            return 'done'
        }
        else if (this.isNextLevel(level)) {
            return 'next-level';
        }
        else {
            return 'forbidden';
        }
    }

    getStatusIcon(level: ILevelPreview) {
        if (this.isDone(level)) {
            return 'glyphicon-ok-sign';
        }
        else if (this.isNextLevel(level)) {
            return 'glyphicon-share-alt'
        }
        else {
            return 'glyphicon-minus-sign';
        }
    }

    isDone(level: ILevelPreview) {
        return level.stars;
    }

    isNextLevel(level: ILevelPreview) {
        if (level.stars) {
            return false;
        }
        let lastFinishedIndex  = -1;
         this.levelList.forEach((item,index) => {
             if(item.stars) {
                 lastFinishedIndex = index;
             }
         });
        const levelIndex = this.levelList.findIndex((l) => l.id === level.id);
        return levelIndex === (lastFinishedIndex + 1);
    }

    getActiveStars(level: ILevelPreview) {
        return (new Array(level.stars)).fill(1);
    }

    getDisablesStars(level: ILevelPreview) {
        return (new Array(3 - level.stars)).fill(1);
    }


}
