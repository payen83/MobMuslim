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
  orderForm: { date_booking: string, package: number, message?: string, address: string, city: string, state: string};
  
  constructor(private router: Router, private modalController: ModalController, private alertController: AlertController) { 
    this.orderForm = { date_booking: null, package: null, message: '', address: null, city: null, state: null};
  }

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
            // this.order.orderUrutPantang(this.orderForm).then(res => {
            //   this.presentCompleted();
            // }, err => {
            //   alert(JSON.stringify(err));
            // });
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
