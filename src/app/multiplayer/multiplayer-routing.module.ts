import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import {MultiplayerComponent} from "./components/multiplayer/multiplayer.component";
import {RoomsComponent} from "./components/rooms/rooms.component";
import {GameComponent} from "./components/game/game.component";

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'multiplayer', component: MultiplayerComponent,
        children: [
          {path: '', redirectTo: 'rooms', pathMatch: 'full'},
          {path: 'rooms', component: RoomsComponent},
          {path: 'game/:id', component: GameComponent},
        ]
      }
    ])
  ]
})
export class MultiplayerRoutingModule { }
