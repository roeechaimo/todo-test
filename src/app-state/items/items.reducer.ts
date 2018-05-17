import { Item } from '../../models/item.model';
import * as fromItems from './items.actions';


export interface ItemsState {
    items: Item[],
    item: Item,
    loading: boolean,
    loaded: boolean,
    error?: any
}

export const initialState: ItemsState = {
    items: null,
    item: null,
    loading: false,
    loaded: false,
    error: null
};

export function itemsReducer(state = initialState, action: fromItems.ItemsActions): ItemsState {
    switch (action.type) {
        case fromItems.LOAD_ITEMS: {
            return {
                ...state,
                loading: true
            }
        }
        case fromItems.LOAD_ITEMS_SUCCESS: {
            return {
                ...state,
                items: action.payload,
                loading: false,
                loaded: true
            }
        }
        case fromItems.LOAD_ITEMS_FAIL: {
            return {
                ...state,
                loading: false,
                loaded: false,
                error: action.payload
            }
        }
        case fromItems.ADD_ITEM: {
            return {
                ...state,
                loading: true
            }
        }
        case fromItems.ADD_ITEMS_SUCCESS: {
            return {
                ...state,
                item: action.payload,
                loading: false,
                loaded: true
            }
        }
        case fromItems.ADD_ITEMS_FAIL: {
            return {
                ...state,
                loading: false,
                loaded: false,
                error: action.payload
            }
        }
    }

    return state;
}

export const getItemsLoading = (state: ItemsState) => state.loading;
export const getItemsLoaded = (state: ItemsState) => state.loaded;
export const getItems = (state: ItemsState) => state.items;
export const addItem = (state: ItemsState) => state.item;