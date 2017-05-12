import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from "rxjs";
import {RoomInterface} from "../../../inteface/room.interface";
import {RoomsSocketService} from "../../../service/rooms/RoomsSocketService";
import {ISocketItem} from "../../../service/socket-item.interface";

@Component({
    selector: 'rooms',
    styleUrls: ['rooms.component.css'],
    templateUrl: 'rooms.component.html'
})
export class RoomsComponent implements OnInit, OnDestroy {

    private rooms: Array<RoomInterface>;
    private roomsSubscription: Subscription;

    constructor(public socketService: RoomsSocketService) {

    }


    ngOnInit(): void {
        this.roomsSubscription =
            this.socketService
                .get('list-rooms')
                .subscribe(
                    (response: ISocketItem) => {
                        console.log('RoomsComponent.ngOnInit -> switch -> default',response);
                        switch (response.action) {
                            case 'update':
                                this.rooms = this.transformToRooms(response);
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

        if (this.roomsSubscription) {
            this.roomsSubscription.unsubscribe();
        }

        return null;
    }


    transformToRooms(response): Array<RoomInterface> {
        return response.payload;
    }


}
