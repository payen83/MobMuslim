import { Injectable } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  _loading: any;
  constructor(public loadingController: LoadingController, public alertController: AlertController) { }

  async presentLoading() {
    const loading = await this.loadingController.create();
    return await loading.present();
  }

  async dismissLoading(){
    return await this.loadingController.dismiss();
  }

  async presentAlert(_message: string, title?: string) {
    const alert = await this.alertController.create({
      header: title,
      message: _message,
      buttons: [
        {
          text: 'OK'
        }
      ]
    });
    await alert.present();
  }
}
