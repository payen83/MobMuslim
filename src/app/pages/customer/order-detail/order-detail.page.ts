import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { AcceptedPage } from '../accepted/accepted.page';
import { Router, ActivatedRoute } from '@angular/router';
import { CompanyDetailsPage } from '../company-details/company-details.page';
import { OrderService } from '../../../services/order/order.service';
import { CommonService } from '../../../services/common/common.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.page.html',
  styleUrls: ['./order-detail.page.scss'],
})
export class OrderDetailPage implements OnInit {
  job_id: any;
  quoteList: Array<any> = [];
  constructor(private common: CommonService, private order: OrderService, private router: Router, private route: ActivatedRoute, private alertController: AlertController, private modalController: ModalController) { 
    this.job_id = this.route.snapshot.paramMap.get('id');
    console.log('id: '+this.job_id);
  }

  ngOnInit() {
    this.common.presentLoading();
    this.order.viewOrderQuotation(this.job_id).then(res => {
    this.common.dismissLoading();
      console.log('list quotation', res);
      let response: any = res;
      this.quoteList = response.list_quotation;
    }, err => {
      this.common.dismissLoading();
      if(err=='token expired'){
        //proceed to login
      }
    })
  }

  async presentAlertConfirm(provider_id: any) {
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
            this.acceptQuotation(provider_id);
          }
        }
      ]
    });
    await alert.present();
  }

  getProviderLocation(provider: any){
    if(provider.provider_city == null){
      return provider.provider_address;
    } else {
      return provider.provider_city;
    }
  }

  acceptQuotation(provider_id: any){
    this.common.presentLoading();
    this.order.acceptQuotation(provider_id, this.job_id).then(res => {
      let response: any = res;
      console.log(response);
      this.common.dismissLoading();
      this.presentAccepted();
    }, err => {
       alert('error: ' + JSON.stringify(err));
    })
    
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
