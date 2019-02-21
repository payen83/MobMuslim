import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { FormCompletedPage } from '../form-completed/form-completed.page';
import { Router } from '@angular/router';
import { OrderService } from '../../../services/order/order.service';
import { CommonService } from '../../../services/common/common.service';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-form-catering',
  templateUrl: './form-catering.page.html',
  styleUrls: ['./form-catering.page.scss'],
})
export class FormCateringPage implements OnInit {
  orderForm: { date_booking: string, type_event: string, message: string, total_visitor: number, address: string, city: string, state: string};
  
  constructor(private router: Router, 
    private alertController: AlertController, 
    private modalController: ModalController, 
    private order: OrderService,
    private common: CommonService,
    private auth: AuthService) { 
    this.orderForm = { date_booking: null, type_event: null, message: null, total_visitor: null, address: null, city: null, state: null};
  }

  ngOnInit() {
    this.auth.getData('USER').then(data => {
      let res: any = data;
      let user = JSON.parse(res);
      //console.log(user);
      this.orderForm.address = user.u_address;
      this.orderForm.city = user.u_city;
      this.orderForm.state = user.u_state;
    });
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
    this.common.presentLoading();
    this.order.orderCatering(this.orderForm).then(res => {
      this.common.dismissLoading();
      this.presentCompleted();
    }, err => {
      alert(JSON.stringify(err));
    });
    this.presentCompleted();
  }

  async presentCompleted(){
    const modal = await this.modalController.create({
      component: FormCompletedPage
      //componentProps: { value: 123 }
    });

    modal.onWillDismiss(data=>{
      this.router.navigateByUrl('/tabs/(order:order)');
    })

    return await modal.present();
  }

}
