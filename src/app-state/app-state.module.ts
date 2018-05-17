import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ItemsModule } from './items/items.module';
import { ItemsEffects } from './items/items.effects';
import * as fromCore from './app.reducer';

@NgModule({
    imports: [
        StoreModule.forRoot(fromCore.reducers),
        EffectsModule.forRoot([ItemsEffects]),
        ItemsModule
    ]
})
export class AppStateModule {
}