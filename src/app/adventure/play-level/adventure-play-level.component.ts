import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router, Params} from "@angular/router";
import AdventureService from "../AdventureService";
import {routerTransition} from "../router.animations";
import {LevelInterface} from "../interfaces/LevelInterface";
import ExperienceService from "../../service/ExperienceService";

const TIME_FOR_TURN = 20 * 1000;

@Component({
    selector: 'adventure-play-level',
    animations: [routerTransition()],
    host: {'[@routerTransition]': ''},
    styleUrls: ['adventure-play-level.component.css'],
    templateUrl: 'adventure-play-level.component.html',

})
export class AdventurePlayLevelComponent implements OnInit, OnDestroy {

    level;
    levelId: number;

    currentSongIndex = 0;
    currentSong;
    rightAnswersCount: number = 0;
    nextSongAt: number = 20;

    answered: boolean = false;

    answersList: Array<boolean> = [];


    private audio = new Audio();

    endTurnTimer;
    nextSongInterval;
    chooseVariantTimer;

    isLevelFinished: boolean = false;

    score:number = 0;
    experience:number = 0;


    constructor(private route: ActivatedRoute,
                private router: Router,
                private service: AdventureService,
                private experienceService: ExperienceService,
                private adventureService: AdventureService) {
    }

    ngOnInit() {
        this.route.params
            .switchMap((params: Params) => {
                this.levelId = +params['levelId'];
                return this.service.getLevelInfo(this.levelId);
            })
            .subscribe((level: LevelInterface) => {
                this.level = level;
                this.startGame();
            });
    }


    startGame() {
        this.nextSongInterval = setInterval(() => this.recalculateNextSongAt(), 1000);
        this.nextSong();
    }

    nextSong() {
        this.clearEndTurnTimer();

        this.currentSong = this.level.Songs[this.currentSongIndex];
        if (!this.currentSong) {
            return this.endGame();
        }
        this.nextSongAt = TIME_FOR_TURN / 1000;
        this.answered = false;
        this.currentSongIndex++;
        this.playNextSong();
        this.endTurnTimer = setTimeout(() => this.chooseVariant(-1), TIME_FOR_TURN);
    }

    playNextSong() {
        this.audio.src = this.currentSong.url;
        this.audio.play();
    }

    chooseVariant(variantId) {

        if (this.answered) {
            return false;
        }

        this.answered = true;

        const answeredCorrect = this.currentSong.RightVariantId === variantId;

        this.answersList.push(answeredCorrect);
        if (answeredCorrect) {
            this.rightAnswersCount++;
        }

        //mark variant as true/false;
        this.currentSong.Variants = this.currentSong.Variants.map((variant) => {
            if (!answeredCorrect && variant.id === variantId) {
                variant.state = 'error';
            }
            if (variant.id === this.currentSong.RightVariantId) {
                variant.state = 'success';
            }
            return variant;
        });

        this.chooseVariantTimer = setTimeout(() => this.nextSong(), 1500);
    }

    recalculateNextSongAt(): void {
        this.nextSongAt--;
        this.nextSongAt = this.nextSongAt > 0 ? this.nextSongAt : 0;
    }

    getTotalSongsCount() {
        return this.level.Songs.length;
    }

    endGame() {
        this.pauseAudio();
        const score = this.score =  this.calculateScore();

        if (score) {
            this.adventureService.markLevelAsCompleted(this.levelId, score).toPromise()
                .then((result) => {
                    this.experience = result.experience;
                    this.experienceService.addExperience(this.experience);
                });
        }
        this.moveToLevelResult();
    }

    moveToLevelResult() {
        const params = {
            score: this.calculateScore(),
            levelId: this.levelId,
        };

        this.isLevelFinished = true;
    }

    calculateScore() {
        const totalSongsCount = this.getTotalSongsCount();
        if (!this.rightAnswersCount) {
            return 0;
        }
        const donePercent = (this.rightAnswersCount / totalSongsCount );
        if (donePercent > 0.70) {
            return 3;
        }
        else if (donePercent > 0.50) {
            return 2;
        }
        else if (donePercent > 0.30) {
            return 1;
        }
        return 0;
    }

    clearEndTurnTimer() {
        clearTimeout(this.endTurnTimer);
    }

    clearChooseVariantTimer() {
        clearTimeout(this.chooseVariantTimer);
    }

    clearNextSongInterval() {
        clearInterval(this.nextSongInterval);
    }

    pauseAudio() {
        if (this.audio) {
            this.audio.pause();
        }
    }

    ngOnDestroy() {
        this.pauseAudio();
        this.clearEndTurnTimer();
        this.clearChooseVariantTimer();
        this.clearNextSongInterval();
    }


}
