import { Component, OnInit } from '@angular/core';
import { FormCompletedPage } from '../form-completed/form-completed.page';
import { ModalController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { OrderService } from '../../../services/order/order.service';
import { CommonService } from '../../../services/common/common.service';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-form-confinement',
  templateUrl: './form-confinement.page.html',
  styleUrls: ['./form-confinement.page.scss'],
})
export class FormConfinementPage implements OnInit {
  orderForm: { phone_no: string, date_booking: string, package: number, message?: string, address: string, city: string, state: string};
  tomorrow: any
  constructor(
    private router: Router, 
    private modalController: ModalController, 
    private alertController: AlertController,
    private order: OrderService,
    private common: CommonService,
    private auth: AuthService) { 

      this.tomorrow = new Date();
      let d = new Date();
      this.tomorrow.setDate(d.getDate()+1);

      this.orderForm = { 
        phone_no: null,
        date_booking: this.tomorrow.toISOString(), 
        package: null, 
        message: null, 
        address: null, 
        city: null, 
        state: null
      };
  }

  ngOnInit() {
    this.auth.getData('USER').then(data => {
      let res: any = data;
      let user = JSON.parse(res);
      this.orderForm.address = user.u_address;
      this.orderForm.city = user.u_city;
      this.orderForm.state = user.u_state;
      if(user.u_phone){
        this.orderForm.phone_no = user.u_phone;
      }
    })
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
            this.performBooking();
          }
        }
      ]
    });

    await alert.present();
  }

  performBooking(){
    if(!this.orderForm.phone_no){
      this.common.presentAlert('Sila masukkan no. telefon anda.', 'Peringatan');
      return;
    }
    this.common.presentLoading().then(()=>{
      this.order.orderUrutPantang(this.orderForm).then(res => {
        console.log(res);
        this.common.dismissLoading().then(()=>{
          this.presentCompleted();
        })
      }, err => {
        alert(JSON.stringify(err));
      });
    });
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
