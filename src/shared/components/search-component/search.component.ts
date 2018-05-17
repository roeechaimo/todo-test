import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Item} from '../../../models/item.model';

@Component({
    selector: 'search-component',
    templateUrl: 'search.component.html',
})
export class SearchComponent implements OnInit {

    @Input() items: Item[];
    @Output() getModifiedItems = new EventEmitter();

    modifiedItems: Item[];
    asc: boolean = false;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
    }

    ngOnInit() {
        this.modifiedItems = this.items;
    }

    getItems(ev: any) {
        this.resetSearch();
        let val = ev.target.value;
        if (val && val.trim() != '') {
            this.modifiedItems = this.items.filter((item) => {
                return (item.item_title.toLowerCase().indexOf(val.toLowerCase()) > -1);
            })
        }

        this.getModifiedItems.emit(this.modifiedItems);
    }

    resetSearch() {
        this.modifiedItems = this.items;
    }

    sortByName() {
        this.modifiedItems = typeof this.modifiedItems === 'undefined' || this.modifiedItems.length === 0 ?
            this.items : this.modifiedItems;
        this.asc = !this.asc;
        this.modifiedItems.sort((name1, name2) => {
            let itemAName = name1.item_title.toUpperCase();
            let itemBName = name2.item_title.toUpperCase();
            if (itemAName < itemBName) {
                if (this.asc) {
                    return -1;
                } else {
                    return 1;
                }
            }
            if (itemAName > itemBName) {
                if (this.asc) {
                    return 1;
                } else {
                    return -1;
                }
            }

            return 0;
        })

        this.getModifiedItems.emit(this.modifiedItems);
    }

    cancelSort() {
        this.modifiedItems = typeof this.modifiedItems === 'undefined' || this.modifiedItems.length === 0 ?
            this.items : this.modifiedItems;
        this.modifiedItems.sort((index1, index2) => {
            let itemAindex = index1.item_id;
            let itemBIndex = index2.item_id;
            if (itemAindex < itemBIndex) {
                return -1;
            }
            if (itemAindex > itemBIndex) {
                return 1;
            }

            return 0;
        })
    }

}
