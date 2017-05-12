import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
const io = require('socket.io-client');


import {ISocketItem} from "../socket-item.interface";
import {BASE_SOCKET_URL} from "../index";


@Injectable()
export class RoomsSocketService {
    private name:string;
    private host:string = BASE_SOCKET_URL;
    // private host: string = window.location.protocol + "//" + window.location.hostname + ":" + window.location.port;

    private socket;

    /**
     * Get items observable
     *
     * @class SocketService
     * @method get
     * @param name string
     * @return Observable<any>
     */
    get(name:string):Observable<ISocketItem> {
        this.name = name;
        let socketUrl = this.host + "/" + this.name;

        console.log('socketUrl', socketUrl);
        this.socket = io.connect(socketUrl);

        this.socket.on("connect", () => this.connect());
        this.socket.on("unauthorized", () => this.onUnauthorized());
        this.socket.on("disconnect", () => this.disconnect());
        this.socket.on("error", (error:string) => {
            console.log(`ERROR: "${error}" (${socketUrl})`);
        });

        return Observable.create((observer:any) => {
            this.socket.on("update", (items:any) => observer.next({action: "update", payload: items}));
            this.socket.on("go-to-game", (gameId:any) => observer.next({action: "go-to-game", payload: gameId}));
            return () => this.socket.close();
        });
    }


    startGameWith(socketId:string) {
        this.socket.emit("fight", socketId);
    }


    startSearchGame() {
        this.socket.emit("start");
    }


    stopSearchGame() {
        this.socket.emit("stop");
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
        alert('onUnauthorized');
        console.log(`Disconnected from "${this.name} BY onUnauthorized"`);
    }
}