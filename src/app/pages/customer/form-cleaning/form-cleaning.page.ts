import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { FormCompletedPage } from '../form-completed/form-completed.page';
import { Router } from '@angular/router';
import { OrderService } from '../../../services/order/order.service';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-form-cleaning',
  templateUrl: './form-cleaning.page.html',
  styleUrls: ['./form-cleaning.page.scss'],
})
export class FormCleaningPage implements OnInit {
  selectOptions: any;
  todayDate: any;
  cleanArea: Array<any>;
  tomorrow: any;
  minDate: any;
  totalPrice: number;
  orderForm: { date_booking: string, duration: number, message?: string, address: string, city: string, state: string, type_property: string, clean_area: string};
  constructor(public auth: AuthService, private order: OrderService, private router: Router, private alertController: AlertController, private modalController: ModalController) { 
    let d = new Date();
    this.tomorrow = new Date();
    this.tomorrow.setDate(d.getDate()+1);
    this.cleanArea = [];
    this.minDate = this.getDateFormat();
    this.totalPrice = null;
    // this.todayDate = d.toISOString();
    //this.orderForm.date_booking = this.todayDate;
    // console.log(this.todayDate);
    this.orderForm = { date_booking: this.tomorrow.toISOString(), duration: null, message: null, address: null, city: null, state: null, clean_area: null, type_property: null};

    this.selectOptions = {
      header: 'Kawasan yang perlu dibersihkan',
      subHeader:'Boleh pilih lebih dari satu pilihan',
      translucent: true
    };  
    
  }

  onChangeDuration(){
    this.totalPrice = this.orderForm.duration * 25;
  }

  ngOnInit() {
    this.auth.getData('USER').then(data => {
      let user: any = data;
      console.log(user);
      this.orderForm.address = JSON.parse(user).u_address;
    })
  }

  getDateFormat() {
    //console.log(this.tomorrow);
    let d = new Date(this.tomorrow);
    return d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDate() ;
    //return d.toISOString();
  }
/*
  body.append('date_booking', data.date_booking);
  body.append('duration', data.duration);
  body.append('message', data.message);
  body.append('address', data.address);
  body.append('city', data.city);
  body.append('lng', data.lng);
  body.append('lat', data.lat);
  body.append('type_property', data.type_property);
  body.append('clean_area', data.clean_area); 
*/
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
            this.orderForm.clean_area = this.cleanArea.toString();
            console.log('Confirm Okay', this.orderForm);
            // this.order.orderCleaning(this.orderForm).then(res => {
            //   this.presentCompleted();
            // })
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
