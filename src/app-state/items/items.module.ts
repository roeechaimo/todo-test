import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ItemsService } from '../../app/services/items.service';
import { itemsReducer } from './items.reducer';
import { ItemsEffects } from './items.effects';

@NgModule({
    imports: [
        StoreModule.forFeature('items', { itemsState: itemsReducer }),
        EffectsModule.forFeature([ ItemsEffects ]),
    ],
    providers: [
        ItemsService
    ]
})
export class ItemsModule {
}