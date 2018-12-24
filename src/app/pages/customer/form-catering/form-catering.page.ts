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
  orderForm: { date_booking: string, type_event: string, message: string, total_visitor: number, address: string, city: string, state: string};
  
  constructor(private router: Router, private alertController: AlertController, private modalController: ModalController) { 
    this.orderForm = { date_booking: null, type_event: null, message: null, total_visitor: null, address: null, city: null, state: null};
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
            // this.order.orderCatering(this.orderForm).then(res => {
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
