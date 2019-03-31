import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../../../services/order/order.service';
import { CommonService } from '../../../services/common/common.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {
  orderList: Array<any>
  
  constructor(private router: Router, private orders: OrderService, private common: CommonService) { 

  }

  ngOnInit() {
    this.common.presentLoading();
    this.orders.orderStatus().then(res => {
      this.common.dismissLoading();
      let response: any = res;
      // console.log(response)
      this.orderList = response;
    }, err => {
      //this.common.dismissLoading();
      console.log(err);
    });
  }

  doRefresh(event) {
    this.ngOnInit();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

  setPrice(price){
    if(price){
      return Number(price).toFixed(0);
    } else {
      return '';
    }
  }

  setMaxPrice(minPrice: number, maxPrice: number){
    if(minPrice != maxPrice){
      return '-'+Number(maxPrice).toFixed(0);
    } else {
      return '';
    }
  }

  viewDetail(job_id: any, status_job: any, booking_id: any){
    if(status_job != null){
      if(status_job == 'Active'){
        this.router.navigateByUrl('StatusDetail/'+job_id);
      } else {
        this.router.navigateByUrl('OrderDetail/'+booking_id);
      }
    } else {
      this.common.presentAlert('Our service providers are not responded yet. Sit tight and come back soon!', 'Opps..');
    }
  }

  showServiceIcon(service: string){
    let url: string = 'assets/icon/';
    let icon: string = null;
    if(service == 'Katering'){
      icon = 'catering.svg';
    } else if (service == 'Urut Pantang') {
      icon = 'confinement.svg';
    } else {
      icon = 'cleaner.svg';
    }
    return url + icon;
  }

}
