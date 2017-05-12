import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from "rxjs";
import {Route, ActivatedRoute, Router} from "@angular/router";
import {UserInterface} from "../../../inteface/user.interface";
import {GameService} from "../../../service/game/GameService";
import UserService from "../../../service/UserService";
import VkService from "../../../service/VkService";
import {ISocketItem} from "../../../service/socket-item.interface";
import {RoomInterface} from "../../../inteface/room.interface";
import {AnswerStatusEnum} from "../../../inteface/AnswerStatusEnum";

@Component({
    selector: 'game',
    styleUrls: ['./game.component.css'],
    templateUrl: './game.component.html'
})
export class GameComponent implements OnInit, OnDestroy {

    private users: Array<UserInterface> = [];
    private song: any;
    private nextSongAt:any = '-';
    private nextSongInterval;
    private currentUser;

    public showFriendsModal:boolean = false;


    private gameSubscription: Subscription;

    private gameId: string;

    private audio = new Audio();

    private selected = false;

    public newMessage;

    public modalOpen:boolean = false;

    constructor(public gameService: GameService,
                private route: ActivatedRoute,
                private userService:UserService,
                private vkService:VkService,
                private router:Router
    ) {

    }


    ngOnInit(): void {
        this.gameId = this.route.snapshot.params['id'];

        this.nextSongInterval = setInterval(() => this.recalculateNextSongAt(), 1000);

        this.gameSubscription =
            this.gameService
                .get(this.gameId)
                .subscribe(
                    (response: ISocketItem) => {

                        // console.log(`response.action = ${response.action}`, response);

                        switch (response.action) {
                            case 'updateAll':
                                this.transformToEntities(response);
                                break;
                            case 'addUser':
                                this.users.push(response.payload);
                                break;
                            case 'newSong':
                                this.setNewSong(response.payload);
                                break;
                            case 'leaveUser':
                                this.users = this.users.filter((user) => user.id !== response.payload.id);
                                break;
                            case 'correctAnswer':
                                this.onCorrectAnswer(response.payload);
                                break;
                            case 'wrongAnswer':
                                this.onWrongAnswer(response.payload);
                                break;
                            case 'currentUser':
                                this.currentUser = response.payload;
                                break;
                            case 'newMessage':
                                this.newMessage = response.payload;
                                break;
                            case 'duplicateRoom':
                                this.onDuplicateRoom();
                                break;
                            default:
                                console.log('RoomsComponent.ngOnInit -> switch -> default');
                                break;
                        }

                    },
                    (e) => {
                        alert('error in SearchGameComponent::ngOnInit');
                        console.log('e', e)
                    },
                    () => {
                        console.log(3)
                    }
                );
    }

    ngOnDestroy(): void {
        console.log('RoomsComponent::ngOnDestroy');

        if (this.gameSubscription) {
            this.gameSubscription.unsubscribe();
        }
        if (this.audio) {
            this.audio.pause();
        }

        if (this.nextSongInterval) {
            clearInterval(this.nextSongInterval);
        }

        return null;
    }


    transformToEntities(response): Array<RoomInterface> {
        this.users = response.payload.users;
        this.setNewSong(response.payload.song);
        return response.payload;
    }

    setNewSong(song) {

        this.selected = false;

        song.Variants = song.Variants.map((variant) => {
            variant.state = 'default';
            return variant;
        });

        this.song = song;
        this.changeTrack(this.song.url);
        this.updateAllUsersForNewSong();
    }

    updateAllUsersForNewSong(){
        this.users = this.users.map((user) => {
            user.answerStatus = AnswerStatusEnum.waiting;
            user.award = false;
            user.addedScore = false;
            return user;
        });
    }


    changeTrack(url: string) {
        this.audio.src = url;
        this.audio.play();
    }

    onCorrectAnswer(newUser:UserInterface) {
        this.users = this.users.map((user:UserInterface) => {
            if (user.id === newUser.id) {
                newUser.answerStatus = AnswerStatusEnum.right;
                newUser.addedScore = newUser.score - user.score;
                return newUser;
            }
            return user;
        });

        console.log('onCorrectAnswer',this.users);
    }


    onWrongAnswer(newUser:UserInterface) {
        this.users = this.users.map((user:UserInterface) => {
            if (user.id === newUser.id) {
                newUser.answerStatus = AnswerStatusEnum.wrong;
                return newUser;
            }
            return user;
        });
    }


    chooseVariant(id: number) {

        if (this.selected) {
            return false;
        }
        this.selected = true;

        this.gameService.chooseVariant(id)
            .then((result) => {
                const {success, RightVariantId, score} = result;

                if (success) {
                    const user = this.findCurrentUser();
                    user.score = score;
                }
                this.song.Variants = this.song.Variants.map((variant) => {

                    if (!success && variant.id === id) {
                        variant.state = 'error';
                    }
                    if (variant.id === RightVariantId) {
                        variant.state = 'success';
                    }
                    return variant;
                });
            });
    }

    findCurrentUser() {
        return this.users.find((user) => user.id === this.currentUser.id);
    }

    getOrderedUsers() {
        return this.users.sort((a, b) => {
            return b.score - a.score;
        })
    }

    recalculateNextSongAt(): void {
        if (!this.song) {
            this.nextSongAt = '-';
            return;
        }

        const currentDate = new Date().getTime();
        const delta = Math.round((this.song.nextSongAt - currentDate) / 1000);
        this.nextSongAt = delta ? delta : 0;
    }

    onSendMessage(text: string) {
        const name = this.findCurrentUser().name;
        const avatarUrl = 'http://placehold.it/50/55C1E7/fff&text=U';
        const msg = {
            name: name,
            avatarUrl: avatarUrl,
            text: text,
        };
        this.gameService.sendMessage(msg);
    }


    inviteFriendToBattle() {
        this.showFriendsModal = true;
    }

    sendInviteToFriend(friendId:number) {
         this.vkService.inviteToBattle(friendId,this.gameId);
    }


    onDuplicateRoom() {
        this.modalOpen = true;
    }

    navigateBack() {
        this.router.navigate(['/']);
    }

}
