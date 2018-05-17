import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule, Platform} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import {HttpClientModule} from '@angular/common/http';
import {IonicStorageModule} from '@ionic/storage';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
// import * as moment from 'moment';
import { AppStateModule } from '../app-state/app-state.module';

import {ToastService} from "./services/toast.service";

import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {ItemDetailsModal} from '../pages/modal/item-details-modal/item-details-modal';
import {ThumbnailViewPage} from '../pages/thumbnail-view/thumbnail-view';
import {AddItemPage} from '../pages/add-item/add-item';
import {SearchComponent} from '../shared/components/search-component/search.component';
import {nameToNumber} from '../shared/pipes/name-to-number/name-to-number.pipe';
import {titleCase} from '../shared/pipes/title-case/title-case.pipe';

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        ItemDetailsModal,
        ThumbnailViewPage,
        AddItemPage,
        SearchComponent,
        nameToNumber,
        titleCase
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
        HttpClientModule,
        IonicStorageModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        AppStateModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        ItemDetailsModal,
        ThumbnailViewPage,
        AddItemPage,
        SearchComponent,
    ],
    providers: [
        StatusBar,
        SplashScreen,
        ToastService,
        {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
})
export class AppModule {

    constructor(platform: Platform, splashScreen: SplashScreen){
        platform.ready().then(() => {
            splashScreen.hide();
        });
    }

}
