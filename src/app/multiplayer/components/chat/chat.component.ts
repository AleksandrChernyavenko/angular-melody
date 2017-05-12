import {Component, OnInit, OnDestroy, Input, Output, EventEmitter, ViewChild, ElementRef} from '@angular/core';
import {ChatMessageInterface} from "../../../inteface/chat-message.interface";

@Component({
    selector: 'chat',
    styleUrls: ['chat.component.css'],
    templateUrl: 'chat.component.html'
})
export class ChatComponent {

    @ViewChild('chatContainer') private chatContainer: ElementRef;
    @Output() onMessage = new EventEmitter<string>();

    opened: boolean = true;
    text: string;

    @Input() currentUserName;

    _messages: Array<ChatMessageInterface> = [];

    @Input()
    set messages(message: string|any) {
        if (this.chatContainer) {
            setTimeout(() => this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight, 0);
        }
        this._messages.push(message);
    }

    get messages() {
        return this._messages;
    }

    toggleChat() {
        this.opened = !this.opened;
    }

    sendMessage() {
        if (this.text) {
            this.onMessage.emit(this.text);
            this.text = '';
        }
    }


}
