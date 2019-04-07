import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { FormCompletedPage } from '../form-completed/form-completed.page';
import { Router } from '@angular/router';
import { OrderService } from '../../../services/order/order.service';
import { AuthService } from '../../../services/auth/auth.service';
import { CommonService } from '../../../services/common/common.service';

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
  orderForm: { phone_no: string, date_booking: string, duration: number, message?: string, address: string, city: string, state: string, type_property: string, clean_area: string};
  constructor(public auth: AuthService, 
    private order: OrderService, 
    private router: Router, 
    private alertController: AlertController, 
    private modalController: ModalController,
    private common: CommonService) { 
    let d = new Date();

    this.tomorrow = new Date();
    this.tomorrow.setDate(d.getDate()+1);
    
    this.cleanArea = [];
    this.minDate = this.getDateFormat();
    this.totalPrice = null;

    this.orderForm = { phone_no: null, date_booking: this.tomorrow.toISOString(), duration: null, message: null, address: null, city: null, state: null, clean_area: null, type_property: null};

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
      let res: any = data;
      let user = JSON.parse(res);
      //console.log(user);
      this.orderForm.address = user.u_address;
      this.orderForm.city = user.u_city;
      this.orderForm.state = user.u_state;
      if(user.u_phone){
        this.orderForm.phone_no = user.u_phone;
      }
    })
  }

  getDateFormat() {
    let d = new Date(this.tomorrow);
    //console.log(d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDate()) ;
    return d.getFullYear() + '-' + this.formatDateMonth(d.getMonth()+1) + '-' + this.formatDateMonth(d.getDate());
  }

  formatDateMonth(data){
    if(data < 10){
      return '0' + data;
    } else {
      return data;
    }
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
            //console.log('Confirm Okay', this.orderForm);
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
    this.orderForm.clean_area = this.cleanArea.toString();
    this.common.presentLoading().then(()=>{
      this.order.orderCleaning(this.orderForm).then(res => {
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
