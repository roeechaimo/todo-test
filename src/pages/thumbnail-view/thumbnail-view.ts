import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Item} from '../../models/item.model';

@IonicPage()
@Component({
    selector: 'page-thumbnail-view',
    templateUrl: 'thumbnail-view.html',
})
export class ThumbnailViewPage {

    items: Item[];
    modifiedItems: Item[];

    constructor(public navCtrl: NavController, public navParams: NavParams) {
    }

    ionViewDidLoad() {
        /**
         * if we want to get items from navParams
         */
        this.items = this.navParams.data;
        this.modifiedItems = this.items;
        /**
         * if we want to get items from local storage
         */
        // this.itemsService.getItemsFromStorage().then((data) => {
        //     this.items = data.items;
        // this.modifiedItems = this.items;
        // });
    }

    getModifiedItems(items: Item[]){
        this.modifiedItems = items;
    }

}
