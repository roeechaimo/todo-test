import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, reorderArray, LoadingController } from 'ionic-angular';
import { Store } from '@ngrx/store';

import { ItemsService } from '../../app/services/items.service';
import { ToastService } from '../../app/services/toast.service';
import { ItemDetailsModal } from '../modal/item-details-modal/item-details-modal';
import { ThumbnailViewPage } from '../thumbnail-view/thumbnail-view';
import { AddItemPage } from '../add-item/add-item';
import { Item } from '../../models/item.model';
import * as AppReducer from '../../app-state/app.reducer';
import * as ItemsActions from '../../app-state/items/items.actions';

import * as moment from 'moment';
import * as _ from 'lodash';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage implements OnInit {

    items: Item[];
    modifiedItems: Item[];
    toNumber: boolean = false;
    res: any;

    loadItems$ = this.store.select(AppReducer.getAllItems);
    itemAdded$ = this.store.select(AppReducer.addItem);

    constructor(public navCtrl: NavController,
                private itemsService: ItemsService,
                private toastService: ToastService,
                public modalCtrl: ModalController,
                public loadingCtrl: LoadingController,
                private store: Store<AppReducer.State>) {

    }

    /**
     * get the local cache '_data' variable after calling the http getItems method and the share() operator
     */
    // ngOnInit() {
    //     this.presentLoadingDefault();
    //     this.itemsService.data = this.itemsService.getItems().share();
    //     this.itemsService.data.subscribe(
    //         res => {
    //             this.itemsService.clearItemsFromStorage();
    //             this.itemsService.setItemsToStorage('items', res);
    //             this.items = res.items;
    //             this.modifiedItems = this.items;
    //             this.applyHighlighted();
    //             this.formatDatesToPresent();
    //         },
    //         error =>
    //             this.toastService.presentToast('Error: ' + error.message, 5000));
    // }

    /**
     * getting the data through subscribing to a regular http observable object
     * @returns {void[]}
     */
    // ngOnInit() {
    //     this.presentLoadingDefault();
    //     this.itemsService.getItems().subscribe(res => {
    //         this.itemsService.clearItemsFromStorage();
    //         this.itemsService.setItemsToStorage('items', res);
    //         this.items = res.items;
    //         this.modifiedItems = this.items;
    //         this.applyHighlighted();
    //         this.formatDatesToPresent();
    //     });
    // }

    /**
     * getting the data using ngStore
     */
    ngOnInit() {
        this.presentLoadingDefault();
        this.loadItems$.subscribe(res => {
                if (!_.isEmpty(res)) {
                    this.itemsService.clearItemsFromStorage();
                    this.itemsService.setItemsToStorage('items', res);
                    this.res = res;
                    this.items = this.res.items;
                    this.modifiedItems = this.items;
                    this.applyHighlighted();
                    this.formatDatesToPresent();
                }
            },
            error => this.toastService.presentToast('Error: ' + error.message, 5000)
        );

        this.itemAdded$.subscribe(res => {
                if (!_.isEmpty(res)) {
                    this.toastService.presentToast('Item ' + res.item_title + ' added', 3000);
                    this.items.push(res);
                    this.modifiedItems.push(res);
                }
            },
            error => this.toastService.presentToast('Error: ' + error.message, 5000)
        );

        this.store.dispatch(new ItemsActions.LoadItems());
    }

    applyHighlighted() {
        if (!_.isEmpty(this.modifiedItems)) {
            return this.modifiedItems.map(item => {
                !item.show_image ?
                    item.is_highlighted = true :
                    item.is_highlighted = false;
            });
        }
    }

    /**
     * todo - move this to a service
     * @param msg
     */
    formatDatesToPresent() {
        this.modifiedItems = this.modifiedItems.map(item => {
            item.item_creation_date = moment(item.item_creation_date, 'DD-MM-YYYY').format('l');
            return item;
        });
    }

    presentItemDetailsModal(item: Item) {
        let itemDetailsModal = this.modalCtrl.create(ItemDetailsModal, item);

        itemDetailsModal.onDidDismiss(data => {
            this.applyHighlighted();
        });

        itemDetailsModal.present();
    }

    goToThumbnailView() {
        this.navCtrl.push(ThumbnailViewPage, this.items);
    }

    goToAddItemView() {
        this.navCtrl.push(AddItemPage, [ this.modifiedItems, this.items ]);
    }

    getModifiedItems(items) {
        this.modifiedItems = items;
    }

    swipe(e) {
        console.log(e);
    }

    reorderItem(indexes) {
        this.modifiedItems = reorderArray(this.modifiedItems, indexes);
    }

    toggleNameToNumber() {
        this.toNumber = this.toNumber ? false : true;
    }

    presentLoadingDefault() {
        let loading = this.loadingCtrl.create({
            content: 'Loading...'
        });

        loading.present();

        setTimeout(() => {
            loading.dismiss();
        }, 2000);
    }

}
