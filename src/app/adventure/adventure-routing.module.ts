import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import {AdventureComponent} from "./adventure.component";
import {GenresListComponent} from "./genres-list/genres-list.component";
import {AdventurePlayLevelComponent} from "./play-level/adventure-play-level.component";
import {LevelsListComponent} from "./levels-list/levels-list.component";

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'adventure', component: AdventureComponent,
        children: [
          {path: '', redirectTo: 'genres-list', pathMatch: 'full'},
          {path: 'genres-list', component: GenresListComponent},
          {path: 'levels-list', component: LevelsListComponent},
          {path: 'play-level/:levelId', component: AdventurePlayLevelComponent},
        ]
      }
    ])
  ]
})
export class AdventureRoutingModule { }
