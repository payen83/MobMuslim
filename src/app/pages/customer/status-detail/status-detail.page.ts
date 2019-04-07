import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../services/common/common.service';
import { OrderService } from '../../../services/order/order.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-status-detail',
  templateUrl: './status-detail.page.html',
  styleUrls: ['./status-detail.page.scss'],
})
export class StatusDetailPage implements OnInit {
  job_id: any;
  orders: Array<any>;
  current_order: {current_status: string, service: string, provider_details: Array<any>};
  service_provider: {name: string, u_phone: string};
  constructor(
    private common: CommonService, 
    private order: OrderService, 
    // private router: Router, 
    private route: ActivatedRoute, 
    private auth: AuthService) { 
    this.job_id = this.route.snapshot.paramMap.get('id');
    // console.log('id: '+this.job_id);
    this.orders = [];
    this.current_order = {current_status: null, service: null, provider_details: []};
    this.service_provider = {name: null, u_phone: null};
    // this.common.presentLoading();

    this.auth.getData('ORDERS').then(res => {
      let _res: any = res;
      let response: any = JSON.parse(_res);
      if(response){
        // console.log('response',response);
        // this.current_order = response.find(_order => _order.job_id == this.job_id);
        // console.log(this.current_order);
        this.orders = response;
        this.getOrder()
        if(!this.current_order){
          this.getOrders();
        } else {
          // console.log(this.current_order);
          this.service_provider = this.current_order.provider_details[0];
          console.log(this.service_provider);
        }
      } else {
        this.getOrders();
      }
    })

    // this.order.viewJobStatus().then(res => {
    //   this.common.dismissLoading();
    //   console.log('orders', res);
    //   if(res){
    //     let response: any = res;
    //     this.orders = response;
    //     //console.log(this.orders);
    //     this.auth.saveData('ORDERS', JSON.stringify(this.orders)).then(()=>{
    //       this.getOrder();
    //     });
    //   }
    // })
    // this.auth.getData('ORDERS').then(res => {
    //   let _orders: any = res;
    //   if(_orders){
    //     //console.log('orders ada', _orders)
    //     this.orders = JSON.parse(_orders);
    //     console.log(this.orders);
    //     this.getOrder();
    //   } else {
    //     this.order.viewJobStatus().then(res => {
    //       console.log('orders', res);
    //       if(res){
    //         let response: any = res;
    //         this.orders = response;
    //         //console.log(this.orders);
    //         this.auth.saveData('ORDERS', JSON.stringify(this.orders)).then(()=>{
    //           this.getOrder();
    //         });
    //       }
    //     })
    //   }
    // })

  }

  getOrder(){
    console.log('job id', this.job_id, 'orders', this.orders);

    this.current_order = this.orders.find(_order => _order.job_id == this.job_id);
     console.log('curr order',this.current_order);
    this.service_provider = this.current_order.provider_details[0];
    // console.log(this.service_provider);
  }

  getOrders(){
    this.common.presentLoading();
    this.order.viewJobStatus().then(res => {
      this.common.dismissLoading();
      if(res){
        let response: any = res;
        this.orders = response;
        
        this.auth.saveData('ORDERS', JSON.stringify(this.orders)).then(()=>{
          this.getOrder();
        });
      }
    })
  }

  ngOnInit(){

  }

  isUrutPantang(service){
    return service == 'Urut Pantang';
  }

  isPembantuRumah(service){
    return service == 'Pembantu Rumah';
  }

  isService(service: string, isService: string){
    return service == isService;
  }

  getBanner(service: string){
    if(service == 'Urut Pantang'){
      return '/assets/img/confinement.png';
    } else if(service == 'Pembantu Rumah'){
      return '/assets/img/cleaning_bg.jpg';
    } else {
      return '/assets/img/catering.png';
    }
  }

}
