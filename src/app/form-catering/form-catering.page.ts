import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { FormCompletedPage } from '../form-completed/form-completed.page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-catering',
  templateUrl: './form-catering.page.html',
  styleUrls: ['./form-catering.page.scss'],
})
export class FormCateringPage implements OnInit {

  constructor(private router: Router, private alertController: AlertController, private modalController: ModalController) { }

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
