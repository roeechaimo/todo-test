import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

@Injectable()

export class ToastService {

    toast: any;

    constructor(private toastCtrl: ToastController) {
    }

    presentToast(msg: string, dur: number) {
        this.toast = this.toastCtrl.create({
            message: msg,
            duration: dur
        });
        this.toast.present();
    }

}