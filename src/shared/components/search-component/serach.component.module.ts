import { IonicModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { SearchComponent } from './search.component';

@NgModule({
    imports: [
        IonicModule
    ],
    declarations: [
        SearchComponent
    ],
    exports: [
        SearchComponent
    ]
})
export class SearchModule {
}