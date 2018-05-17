import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import * as AppReducer from '../../app-state/app.reducer';
import * as ItemsActions from '../../app-state/items/items.actions';
import { ItemsService } from '../../app/services/items.service';
import { ToastService } from '../../app/services/toast.service';
import { Item } from '../../models/item.model';

import * as moment from 'moment';
import * as _ from 'lodash';

@IonicPage()
@Component({
    selector: 'page-add-item',
    templateUrl: 'add-item.html'
})
export class AddItemPage implements OnInit {

    modifiedItems: Item[];
    items: Item[];

    itemForm: FormGroup;

    itemAdded$ = this.store.select(AppReducer.addItem);

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private itemsService: ItemsService,
                private toastService: ToastService,
                private formBuilder: FormBuilder,
                private store: Store<AppReducer.State>) {
    }

    ngOnInit() {
        this.itemForm = this.formBuilder.group({
            item_title: [ null, [ Validators.minLength(3), Validators.required ] ],
            item_body: [ null, [ Validators.minLength(2), Validators.required ] ],
            item_image_url: [ null, [ Validators.minLength(6), Validators.required ] ]
        });
        this.itemAdded$.subscribe(res => {
                if (!_.isEmpty(res)) {
                    this.navCtrl.pop();
                }
            },
            error => this.toastService.presentToast('Error: ' + error.message, 5000)
        );
    }

    saveItem(item) {
        if (!this.itemForm.valid) {
            console.log('not valid');
            return;
        }

        this.modifiedItems = [ ...this.navParams.data[ 0 ] ];
        this.items = [ ...this.navParams.data[ 1 ] ];
        let idAndDateToApply = this.setIdAndDate(this.items);
        item.value.item_id = idAndDateToApply.id;
        item.value.item_creation_date = idAndDateToApply.date;
        item.value.show_image = true;
        //hard coded for testing
        item.value.item_image_url = 'http://tutaki.org.nz/wp-content/uploads/2016/04/no-image-available.png';

        this.setItem(item.value);

    }

    setIdAndDate(items) {
        let idToApply = Math.max.apply(Math, items.map(item => {
            return item.item_id;
        }));

        let dateToApply = moment(new Date()).subtract(10, 'days').calendar();

        return { 'id': idToApply, 'date': dateToApply };
    }

    validateItemTitle() {
        return this.itemForm.controls.item_title.valid || this.itemForm.controls.item_title.untouched;
    }

    validateItemBody() {
        return this.itemForm.controls.item_body.valid || this.itemForm.controls.item_body.untouched;
    }

    validateItemImageUrl() {
        return this.itemForm.controls.item_image_url.valid || this.itemForm.controls.item_image_url.untouched;
    }

    /**
     * set item using regular http call via itemsService
     * @param item
     */
    // setItem(item) {
    //     let headers = { 'Content-Type': 'application/json' };
    //     this.itemsService.setItem(item, headers).subscribe(res => {
    //         if (res.success) {
    //             this.toastService.presentToast('Item ' + item.item_title + ' added', 3000);
    //             this.modifiedItems.push(item);
    //             this.items.push(item);
    //             this.formatDatesToPresent();
    //             this.navCtrl.pop();
    //         } else {
    //             this.toastService.presentToast('There was a problem', 3000);
    //         }
    //     });
    // }

    /**
     * set item using ngStore
     * @param item
     */
    setItem(item) {
        let headers = { 'Content-Type': 'application/json' };
        this.itemsService.setItem(item, headers).subscribe(res => {
            if (res.success) {
                this.store.dispatch(new ItemsActions.AddItem(item));
            } else {
                this.toastService.presentToast('There was a problem', 3000);
            }
        });
    }

    /**
     * todo - move this to a service
     * @param msg
     */
    formatDatesToPresent() {
        this.modifiedItems = this.modifiedItems.map(item => {
            item.item_creation_date = moment(item.item_creation_date).format('LL');
            return item;
        });
    }

}
