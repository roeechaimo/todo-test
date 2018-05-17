import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {ThumbnailViewPage} from './thumbnail-view';

@NgModule({
    declarations: [
        ThumbnailViewPage,
    ],
    imports: [
        IonicPageModule.forChild(ThumbnailViewPage),
    ],
    exports: [
        ThumbnailViewPage
    ],
})
export class ThumbnailViewPageModule {
}
