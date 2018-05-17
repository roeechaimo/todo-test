import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/exhaustMap';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import { of } from 'rxjs/observable/of';

import { ItemsService } from '../../app/services/items.service';
import * as itemsActions from './items.actions';

@Injectable()

export class ItemsEffects {

    constructor(private actions$: Actions, private itemsService: ItemsService) {
    }

    @Effect()
    loadItems$ = this.actions$.ofType(itemsActions.LOAD_ITEMS)
        .exhaustMap((itemsData) => {
            return this.itemsService.getItems()
                .map(response => new itemsActions.LoadItemsSuccess(response))
                .catch(error => of(new itemsActions.LoadItemsFail(error)));
        });

    @Effect()
    itemAdded$ = this.actions$.ofType(itemsActions.ADD_ITEM)
        .exhaustMap((itemData) => {
            return this.itemsService.addItemAfterResponse(itemData)
                .map(response => new itemsActions.AddItemSuccess(response))
                .catch(error => of(new itemsActions.AddItemFail(error)));
        });

}