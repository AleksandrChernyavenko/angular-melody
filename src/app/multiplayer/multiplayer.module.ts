import {NgModule} from '@angular/core';

import {MultiplayerRoutingModule} from './multiplayer-routing.module';
import {SharedModule} from "../shared/shared.module";
import {MultiplayerComponent} from "./components/multiplayer/multiplayer.component";
import {RoomsComponent} from "./components/rooms/rooms.component";
import {GameComponent} from "./components/game/game.component";
import {UserListComponent} from "./components/user-list/user-list.component";
import {ChatComponent} from "./components/chat/chat.component";
import {ShowFriendsModalComponent} from "./components/show-friends-modal/show-friends-modal.component";

@NgModule({
    imports: [
        SharedModule,
        MultiplayerRoutingModule
    ],
    declarations: [
        MultiplayerComponent,
        RoomsComponent,
        GameComponent,
        UserListComponent,
        ChatComponent,
        ShowFriendsModalComponent,
    ]
})
export class MultiplayerModule {
}
