import { Action } from '@ngrx/store';
import { Item } from '../../models/item.model';

export const LOAD_ITEMS = '[Item] Load Items';
export const LOAD_ITEMS_SUCCESS = '[Item] Load Items Success';
export const LOAD_ITEMS_FAIL = '[Item] Load Items Fail';
export const ADD_ITEM = '[Item] Add Item';
export const ADD_ITEMS_SUCCESS = '[Item] Add Item Success';
export const ADD_ITEMS_FAIL = '[Item] Add Item Fail';

//Load Items
export class LoadItems implements Action {
    readonly type = LOAD_ITEMS;
    constructor(){}
}

export class LoadItemsSuccess implements Action {
    readonly type = LOAD_ITEMS_SUCCESS;
    constructor(public payload: Item[]){}
}

export class LoadItemsFail implements Action {
    readonly type = LOAD_ITEMS_FAIL;
    constructor(public payload: any){}
}

//Add Item
export class AddItem implements Action {
    readonly type = ADD_ITEM;
    constructor(public payload: any){}
}
export class AddItemSuccess implements Action {
    readonly type = ADD_ITEMS_SUCCESS;
    constructor(public payload: any){}
}
export class AddItemFail implements Action {
    readonly type = ADD_ITEMS_FAIL;
    constructor(public payload: any){}
}

export type ItemsActions =
    LoadItems |
    LoadItemsSuccess |
    LoadItemsFail |
    AddItem |
    AddItemSuccess |
    AddItemFail;