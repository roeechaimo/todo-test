///<reference path="../../../node_modules/rxjs/add/operator/map.d.ts"/>
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';

@Injectable()

export class ItemsService {

    items: any;
    _data: any;

    constructor(private http: HttpClient, public storage: Storage) {
    }

    /**
     * using a local cache '_data' variable to get and set the items
     * @returns {any}
     */
    // get data() {
    //     return this._data;
    // }
    //
    // set data(value) {
    //     this._data = value;
    // }
    //
    // getItems(): any {
    //      return this.http.get('../../assets/cache/items.json')
    //         .map((res) => res)
    //         .catch((error: any) => Observable.throw(error));
    // }

    /**
     * using regular http observable object which is being returned to the component to subscribe to
     * @param key
     * @param value
     */
    getItems(): Observable<any> {
        return this.http.get('assets/cache/items.json')
            .map((res: Response) => res)
            .catch((error: any) => Observable.throw(error));
    }

    setItemsToStorage(key, value) {
        this.storage.set(key, value);
    }

    getItemsFromStorage() {
        return this.storage.get('items');
    }

    clearItemsFromStorage() {
        this.storage.clear();
    }

    setItem(item, headers): Observable<any> {
        return this.http.post('https://03205f3c-d77e-4a4c-92bb-f77ba96b6d1a.mock.pstmn.io/items',
            JSON.stringify(item),
            { headers: headers })
            .map((res: Response) => res)
            .catch((error: any) => Observable.throw(error));
    }

    /**
     * get an item and returns it
     * @param item
     * @returns {any}
     */
    addItemAfterResponse(item: any): Observable<any> {
        const itemObservable = new Observable((observer) => {
            observer.next(item.payload);
            observer.error('There was an error!');
            observer.complete();
        });
        return itemObservable;
    }

}