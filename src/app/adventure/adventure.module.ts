import {NgModule} from '@angular/core';

import {AdventureRoutingModule} from './adventure-routing.module';
import {AdventureComponent} from "./adventure.component";
import {GenresListComponent} from "./genres-list/genres-list.component";
import {AdventurePlayLevelComponent} from "./play-level/adventure-play-level.component";
import {LevelsListComponent} from "./levels-list/levels-list.component";
import {SharedModule} from "../shared/shared.module";
import {AnswerProgressBarComponent} from "./play-level/answer-progress-bar/answer-progress-bar.component";

@NgModule({
    imports: [
        SharedModule,
        AdventureRoutingModule
    ],
    declarations: [
        AdventureComponent,
        GenresListComponent,
        AdventurePlayLevelComponent,
        LevelsListComponent,
        AnswerProgressBarComponent,
    ]
})
export class AdventureModule {
}
