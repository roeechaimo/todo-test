import {Component, OnInit} from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';
import {Item} from '../../../models/item.model';

@Component({
    selector: 'page-item-details-modal',
    templateUrl: 'item-details-modal.html'
})
export class ItemDetailsModal implements OnInit {

    item: Item;

    constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {

    }

    ngOnInit() {
        this.item = this.navParams.data;
    }

    dismiss() {
        this.viewCtrl.dismiss(this.item);
    }

}
