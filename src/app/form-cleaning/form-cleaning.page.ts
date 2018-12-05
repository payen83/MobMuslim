import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { FormCompletedPage } from '../form-completed/form-completed.page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-cleaning',
  templateUrl: './form-cleaning.page.html',
  styleUrls: ['./form-cleaning.page.scss'],
})
export class FormCleaningPage implements OnInit {
  selectOptions: any;
  todayDate: any;
  constructor(private router: Router, private alertController: AlertController, private modalController: ModalController) { 
    this.selectOptions = {
      header: 'Kawasan yang perlu dibersihkan',
      subHeader:'Boleh pilih lebih dari satu pilihan',
      translucent: true
    };  
    this.todayDate = null;
  }

  ngOnInit() {
    let d = new Date();
    this.todayDate = d.toDateString();
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
