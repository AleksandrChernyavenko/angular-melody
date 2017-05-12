import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

declare const VK: any;
//  https://vk.com/dev/datatypes
//  https://habrahabr.ru/sandbox/43770/
//  https://vk.com/page-1_27445058          - Описание полей параметра fields

@Injectable()
export default class VkService {
K
    inviteToBattle(userId: number, gameId)  {

        const photo = 'photo238050252_456239039';

        const params = {
            owner_id: userId,
            message: `Сразись со мной в приложении "Угадай мелодию"`,
            attachments: `${photo},https://vk.com/app5724001#game/${gameId}`
        };

        VK.api("wall.post", params, function (data) {
            console.log('wall.post result',data, data.error, data.response);
        });
    }

    getAllFriends(): Observable<any> {
        return Observable.create(subscriber => {
            VK.api("friends.get", {fields: 'photo', order: 'random'}, function (data) {
                subscriber.next(data.response);
                subscriber.complete();
            });
            return subscriber;
        });
    }


}
