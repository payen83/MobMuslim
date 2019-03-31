import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../../services/order/order.service';
import { CommonService } from '../../../services/common/common.service';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.page.html',
  styleUrls: ['./company-details.page.scss'],
})
export class CompanyDetailsPage implements OnInit {
  solid = false;
  provider_id: any
  provider: any;
  constructor(private common: CommonService, private toastController: ToastController, private route: ActivatedRoute, private order: OrderService) { 
    this.provider_id = this.route.snapshot.paramMap.get('id');
    console.log('provider id',this.provider_id);
    this.provider = {state: null, about_me: null, address: null, feedback: [], phone: null, postcode: null, provider_name: null, company_name: null};
  }

  ngOnInit() {
    this.common.presentLoading();
    this.order.getService('users/view-provider-details/', this.provider_id).then(res => {
      this.common.dismissLoading();
      let response: any = res;
      this.provider = response[0];
      console.log('response:',response);
    }, err => {
      console.log(err);
    })
  }

  changeFill(){
    this.solid = !this.solid;
    if (this.solid){
      this.presentToast();
    }
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'This company has been bookmarked.',
      duration: 2000,
      cssClass: "toastBackground"
    });
    toast.present();
  }

  isSolid(){
    return this.solid == true;
  }

}
