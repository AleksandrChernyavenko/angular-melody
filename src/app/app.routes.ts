import {Routes} from '@angular/router';
import {ManagementComponent} from "./managment/managment.component";
import {SongListComponent} from "./managment/songs/song-list/song-list.component";
import {AddNewSongComponent} from "./managment/songs/add-new-song/add-new-song.component";
import {UploadSongComponent} from "./managment/upload-song/upload-song.component";
import {GenreComponent} from "./managment/genre/genre.component";
import {GenreListComponent} from "./managment/genre/list/genre-list.component";
import {CreateGenreComponent} from "./managment/genre/create-genre/create-genre.component";
import {SongsComponent} from "./managment/songs/songs.component";
import {UploadGenreImageComponent} from "./managment/genre/upload-genre-image/upload-genre-image.component";
import {LevelsComponent} from "./managment/levels/levels.component";
import {LevelsListComponent} from "./managment/levels/levels-list/levels-list.component";
import {GenresListComponent} from "./managment/levels/genres-list/genres-list.component";
import {UsersComponent} from "./managment/users/users.component";

export const rootRouterConfig: Routes = [
    {path: '', redirectTo: 'multiplayer', pathMatch: 'full'},
    {
        path: 'management', component: ManagementComponent,
        children: [
            {path: '', redirectTo: 'songs', pathMatch: 'full'},
            {
                path: 'songs', component: SongsComponent,
                children: [
                    {path: '', redirectTo: 'list', pathMatch: 'full'},
                    {path: 'list', component: SongListComponent},
                    {path: 'add-new-song', component: AddNewSongComponent},
                    {path: 'upload/:id', component: UploadSongComponent},
                ]
            },
            {
                path: 'genres', component: GenreComponent,
                children: [
                    {path: '', redirectTo: 'list', pathMatch: 'full'},
                    {path: 'list', component: GenreListComponent},
                    {path: 'add-new-genre', component: CreateGenreComponent},
                    {path: 'upload/:id', component: UploadGenreImageComponent},
                ]
            },
            {
                path: 'levels', component: LevelsComponent,
                children: [
                    {path: '', redirectTo: 'genres-list', pathMatch: 'full'},
                    {path: 'genres-list', component: GenresListComponent},
                    {path: 'levels-list/:genreId', component: LevelsListComponent},
                ]
            },
            {
                path: 'users', component: UsersComponent,
            },


        ]
    }
];

