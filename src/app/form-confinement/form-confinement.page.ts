import { Component, OnInit } from '@angular/core';
import { FormCompletedPage } from '../form-completed/form-completed.page';
import { ModalController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-confinement',
  templateUrl: './form-confinement.page.html',
  styleUrls: ['./form-confinement.page.scss'],
})
export class FormConfinementPage implements OnInit {

  constructor(private router: Router, private modalController: ModalController, private alertController: AlertController) { }

  ngOnInit() {
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Confirmation',
      message: 'Are you sure you want to proceed with the booking?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Yes',
          handler: () => {
            //console.log('Confirm Okay');
            this.presentCompleted();
          }
        }
      ]
    });

    await alert.present();
  }

  async presentCompleted(){
    const modal = await this.modalController.create({
      component: FormCompletedPage,
      componentProps: { value: 123 }
    });
    modal.onWillDismiss(data=>{
      this.router.navigateByUrl('/tabs/(order:order)');
    })
    return await modal.present();
  }


}
