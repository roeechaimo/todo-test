import { ActionReducerMap, createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromItems from './items/items.reducer';


export interface ItemsState {
    itemsState: fromItems.ItemsState;
}

export interface State {
    itemsState: ItemsState;
}

export const reducers: ActionReducerMap<any> = {
    items: fromItems.itemsReducer
};

export const selectItemsState = createFeatureSelector<ItemsState>('items');

export const selectItemsStatusState = createSelector(
    selectItemsState, (state: ItemsState) => state.itemsState);


export const getAllItems = createSelector(selectItemsStatusState, fromItems.getItems);
export const getItemsLoading = createSelector(selectItemsStatusState, fromItems.getItemsLoading);
export const getItemsLoaded = createSelector(selectItemsStatusState, fromItems.getItemsLoaded);
export const addItem = createSelector(selectItemsStatusState, fromItems.addItem);