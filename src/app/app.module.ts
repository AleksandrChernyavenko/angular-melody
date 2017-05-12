import {NgModule, APP_INITIALIZER} from '@angular/core'
import {RouterModule} from "@angular/router";
import {rootRouterConfig} from "./app.routes";
import {AppComponent} from "./app.component";
import {LocationStrategy, PathLocationStrategy} from '@angular/common';
import {RoomsSocketService} from "./service/rooms/RoomsSocketService";
import {GameService} from "./service/game/GameService";
import {ManagementComponent} from "./managment/managment.component";
import SongService from "./service/SongService";
import {SongListComponent} from "./managment/songs/song-list/song-list.component";
import {AddNewSongComponent} from "./managment/songs/add-new-song/add-new-song.component";
import {AudioComponent} from "./managment/audio-song/audio-song.component";
import {FileUploadModule} from "ng2-file-upload";
import VariantService from "./service/VariantService";
import {PaginationComponent} from "./managment/pagination/pagination.component";
import {UploadSongComponent} from "./managment/upload-song/upload-song.component";
import UserService from "./service/UserService";
import {TooltipModule} from "ng2-tooltip";
import {GenreComponent} from "./managment/genre/genre.component";
import GenreService from "./service/GenreService";
import {GenreListComponent} from "./managment/genre/list/genre-list.component";
import {CreateGenreComponent} from "./managment/genre/create-genre/create-genre.component";
import VkService from "./service/VkService";

import { TagInputModule } from 'ng2-tag-input';
import {InlineEditGenreComponent} from "./managment/songs/song-list/inline-edit-genre/inline-edit-genre.component";
import {SongsComponent} from "./managment/songs/songs.component";
import {UploadGenreImageComponent} from "./managment/genre/upload-genre-image/upload-genre-image.component";
import {AdventureModule} from "./adventure/adventure.module";
import {LevelsComponent} from "./managment/levels/levels.component";
import {LevelsListComponent} from "./managment/levels/levels-list/levels-list.component";
import {GenresListComponent} from "./managment/levels/genres-list/genres-list.component";

import { Ng2AutoCompleteModule } from 'ng2-auto-complete';
import {SharedModule} from "./shared/shared.module";
import {UsersComponent} from "./managment/users/users.component";
import UserManagementService from "./managment/users/UserManagementService";
import {MultiplayerModule} from "./multiplayer/multiplayer.module";
import {UserLevelService} from "./service/UserLevelService";
import ExperienceService from "./service/ExperienceService";

export function init_app(userService: UserService){
    return () => userService.loadUser() ;
}

@NgModule({
    declarations: [
        AppComponent,
        ManagementComponent,
        SongListComponent,
        AddNewSongComponent,
        AudioComponent,
        PaginationComponent,
        UploadSongComponent,
        GenreComponent,
        GenreListComponent,
        CreateGenreComponent,
        InlineEditGenreComponent,
        SongsComponent,
        UploadGenreImageComponent,
        LevelsComponent,
        LevelsListComponent,
        GenresListComponent,
        UsersComponent,
    ],
    imports: [
        SharedModule,
        FileUploadModule,
        TooltipModule,
        TagInputModule,
        AdventureModule,
        MultiplayerModule,
        Ng2AutoCompleteModule,
        RouterModule.forRoot(rootRouterConfig)
    ],
    providers: [
        UserService,
        {
            provide: APP_INITIALIZER,
            useFactory: init_app,
            deps: [UserService],
            multi: true,
        },
        RoomsSocketService,
        GameService,
        SongService,
        GenreService,
        VariantService,
        VkService,
        UserManagementService,
        {provide: LocationStrategy, useClass: PathLocationStrategy},
        UserLevelService,
        ExperienceService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {

}
