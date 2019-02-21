import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseURL: string = 'http://mobilemuslim.elyzian.xyz/api/request-service/';
  
  constructor(public http: HttpClient, public auth: AuthService) { 

  }

  orderCleaning(data){
    return new Promise((resolve, reject) => {
      this.auth.getData('USER').then(res => {
        let response: any = res;
        let user: any = JSON.parse(response);
        let url: string = this.baseURL + 'pembantu-rumah/' + user.id;
        let body = new FormData();
        body.append('date_booking', data.date_booking);
        body.append('duration', data.duration);
        body.append('message', data.message);
        body.append('address', data.address);
        body.append('city', data.city);
        body.append('lng', data.lng);
        body.append('lat', data.lat);
        body.append('type_property', data.type_property);
        body.append('clean_area', data.clean_area);
        
          this.http.post(url, body)
          .subscribe(res => {
            let response: any = res;
            if(response.status){
              resolve(response);
            } else {
              reject(response.error);
            }
          }, err => {
            reject(err)
          })
      })
    });
  }

  orderCatering(data){
    // this.orderForm = { date_booking: null, type_event: null, total_visitor: null, address: null, city: null, state: null};

    return new Promise((resolve, reject) => {
      this.auth.getData('USER').then(res => {
        let response: any = res;
        let user: any = JSON.parse(response);
        let url: string = this.baseURL + 'katering/' + user.id;
        let body = new FormData();
        body.append('date_booking', data.date_booking);
        body.append('type_event', data.type_event);
        body.append('message', data.message);
        body.append('address', data.address);
        body.append('city', data.city);
        body.append('state', data.state);
        body.append('total_visitor', data.total_visitor);        
          this.http.post(url, body)
          .subscribe(res => {
            let response: any = res;
            if(response.status){
              resolve(response);
            } else {
              reject(response.error);
            }
          }, err => {
            reject(err)
          })
      })
    });
  }

  orderUrutPantang(data){
    return new Promise((resolve, reject) => {
      this.auth.getData('USER').then(res => {
        let response: any = res;
        let user: any = JSON.parse(response);
        let url: string = this.baseURL + 'urut-pantang/' + user.id;
        let body = new FormData();
        body.append('date_booking', data.date_booking);
        body.append('package', data.package);
        body.append('message', data.message);
        body.append('address', data.address);
        body.append('city', data.city);
        body.append('state', data.state);      
          this.http.post(url, body)
          .subscribe(res => {
            let response: any = res;
            if(response.status){
              resolve(response);
            } else {
              reject(response.error);
            }
          }, err => {
            reject(err)
          })
      })
    });
  }

  orderStatus(data){
    return new Promise((resolve, reject) => {
      this.auth.getData('USER').then(res => {
        let response: any = res;
        let user: any = JSON.parse(response);
        let url: string = this.baseURL + 'urut-pantang/' + user.id;
        let body = new FormData();
        body.append('date_booking', data.date_booking);
        body.append('package', data.package);
        body.append('message', data.message);
        body.append('address', data.address);
        body.append('city', data.city);
        body.append('state', data.state);      
          this.http.post(url, body)
          .subscribe(res => {
            let response: any = res;
            if(response.status){
              resolve(response);
            } else {
              reject(response.error);
            }
          }, err => {
            reject(err)
          })
      })
    });
  }

}
