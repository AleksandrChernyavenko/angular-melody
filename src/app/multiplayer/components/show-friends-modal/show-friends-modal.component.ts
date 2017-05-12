import {Component, OnInit, OnDestroy, Input, Output, EventEmitter} from '@angular/core';
import VkService from "../../../service/VkService";


@Component({
    selector: 'show-friends-modal',
    styleUrls: ['show-friends-modal.component.css'],
    templateUrl: 'show-friends-modal.component.html'
})
export class ShowFriendsModalComponent implements OnInit{

    public friends: Array<any> = [];
    public search:string = '';
    public loading:boolean = true;

    @Output() onChooseUser = new EventEmitter<number>();
    @Output() onClose = new EventEmitter();

    constructor(private vkService: VkService) {

    }

    ngOnInit(): void {
        this.loadFriends();
    }

    loadFriends() {
        this.vkService.getAllFriends()
            .subscribe(
                (response) => {
                    this.friends = response.items;
                    this.loading = false;
                },
            );
    }

    getFilteredFriends() {
        if(!this.search) {
            return this.friends;
        }
        return this.friends.filter((friend) => {
               const name =  `${friend.first_name} ${friend.last_name} ${friend.first_name}`.toLocaleLowerCase();
               return name.includes(this.search.toLocaleLowerCase());
        });
    }

    closeModal() {
        this.search = '';
        this.onClose.emit(true);
    }

    chooseUser(id:number) {
        this.onChooseUser.emit(id);
    }



}
