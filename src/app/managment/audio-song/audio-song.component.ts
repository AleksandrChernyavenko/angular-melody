import {Component, Input, OnDestroy} from '@angular/core';

@Component({
    selector: 'audio-song',
    styleUrls: ['audio-song.component.css'],
    templateUrl: 'audio-song.component.html',
})
export class AudioComponent implements OnDestroy {


    private audio = new Audio();
    private played: boolean = false;

    @Input() url;

    ngOnDestroy(): void {
        this.audio.pause();
    }

    toggleAudio() {
        if (this.played) {
            this.audio.pause();
            this.played = false;
        }
        else {
            this.audio.src = this.url;
            this.audio.play();
            this.played = true;
        }
    }


}
