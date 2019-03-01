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
  constructor(
    private common: CommonService, 
    private order: OrderService, 
    private router: Router, 
    private route: ActivatedRoute, 
    private auth: AuthService) { 
    this.job_id = this.route.snapshot.paramMap.get('id');
    console.log('id: '+this.job_id);
    this.orders = [];
    
    this.auth.getData('ORDERS').then(res => {
      let _orders: any = res;
      if(_orders){
        //console.log('orders ada', _orders)
        this.orders = JSON.parse(_orders);
        console.log(this.orders);
        this.getOrder();
      } else {
        this.order.viewJobStatus().then(res => {
          //console.log('orders');
          if(res){
            let response: any = res;
            this.orders = response;
            //console.log(this.orders);
            this.auth.saveData('ORDERS', JSON.stringify(this.orders));
            this.getOrder();
          }
        })
      }
    })

  }

  ngOnInit() {
    
  } 

  getOrder(){
    let current_order = this.orders.find(_order => _order.job_id == this.job_id);
    console.log(current_order);
  }

}
