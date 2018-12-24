import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { AcceptedPage } from '../accepted/accepted.page';
import { Router } from '@angular/router';
import { CompanyDetailsPage } from '../company-details/company-details.page';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.page.html',
  styleUrls: ['./order-detail.page.scss'],
})
export class OrderDetailPage implements OnInit {

  constructor(private router: Router, private alertController: AlertController, private modalController: ModalController) { }

  ngOnInit() {
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Confirmation',
      message: 'Are you sure you want to accept this offer?',
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
            console.log('Confirm Okay');
            this.presentAccepted();
          }
        }
      ]
    });

    await alert.present();
  }

  async companyDetails(){
    const modal = await this.modalController.create({
      component: CompanyDetailsPage,
      componentProps: { value: 123 }
    });
    return await modal.present();
  }

  async presentAccepted(){
    const modal = await this.modalController.create({
      component: AcceptedPage,
      componentProps: { value: 123 }
    });
    modal.onWillDismiss(data=>{
      this.router.navigateByUrl('/tabs/(order:order)');
    })
    return await modal.present();
    
  }

}
