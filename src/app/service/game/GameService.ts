import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {ISocketItem} from "../socket-item.interface";
import {BASE_SOCKET_URL} from "../index";

const io = require('socket.io-client');


@Injectable()
export class GameService {
    private name: string = 'game';
    private host: string = BASE_SOCKET_URL;
    // private host: string = window.location.protocol + "//" + window.location.hostname + ":" + window.location.port;

    private socket;

    get(gameId: string): Observable<ISocketItem> {
        let socketUrl = this.host + "/" + this.name + `${gameId}`;

        console.log('socketUrl', socketUrl);
        this.socket = io.connect(socketUrl);

        this.socket.on("connect", () => this.connect());
        this.socket.on("unauthorized", () => this.onUnauthorized());
        this.socket.on("disconnect", () => this.disconnect());
        this.socket.on("error", (error: string) => {
            console.log(`ERROR: "${error}" (${socketUrl})`);
        });

        return Observable.create((observer: any) => {
            this.socket.on("updateAll", (items: any) => observer.next({action: "updateAll", payload: items}));

            this.socket.on("addUser", (items: any) => observer.next({action: "addUser", payload: items}));
            this.socket.on("currentUser", (items: any) => observer.next({action: "currentUser", payload: items}));
            this.socket.on("leaveUser", (items: any) => observer.next({action: "leaveUser", payload: items}));
            this.socket.on("newSong", (items: any) => observer.next({action: "newSong", payload: items}));
            this.socket.on("correctAnswer", (items: any) => observer.next({action: "correctAnswer", payload: items}));
            this.socket.on("wrongAnswer", (items: any) => observer.next({action: "wrongAnswer", payload: items}));
            this.socket.on("updateSong", (items: any) => observer.next({action: "updateSong", payload: items}));
            this.socket.on("newMessage", (items: any) => observer.next({action: "newMessage", payload: items}));
            this.socket.on("duplicateRoom", (items: any) => observer.next({action: "duplicateRoom", payload: items}));

            return () => this.socket.close();
        });
    }


    chooseVariant(variantId: number): Promise<any> {
        return new Promise((resolve) => {
            this.socket.emit("answer", variantId, (res) => {
                resolve(res);
            });
        });
    }

    sendMessage(msg: any) {
        this.socket.emit("newMessage", msg);
    }

    /**
     * Handle connection opening
     *
     * @class SocketService
     * @method connect
     * @return void
     */
    private connect() {
        console.log(`Connected to "${this.name}"`);
        // Request initial list when connected
        this.socket.emit("update");
    }

    /**
     * Handle connection closing
     *
     * @class SocketService
     * @method disconnect
     * @return void
     */
    private disconnect() {
        console.log(`Disconnected from "${this.name}"`);
    }

    /**
     * Handle unauthorized connection
     *
     * @class SocketService
     * @method onUnauthorized
     * @return void
     */
    private onUnauthorized() {
        console.log(`Disconnected from "${this.name} BY onUnauthorized"`);
    }
}