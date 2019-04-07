import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private httpOptions: any;
  private baseURL: string = 'http://mobilemuslim.elyzian.xyz/api/';
  
  constructor(public http: HttpClient, public auth: AuthService) { 
    this.auth.getData('TOKEN').then(token => {
      let new_headers = new HttpHeaders({ 
        'Authorization': 'Bearer ' + token
      });
      this.httpOptions = { 
        headers: new_headers
      };
    })
  }

  formatDateMonth(data){
    if(data < 10){
      return '0' + data;
    } else {
      return data;
    }
  }

  setDate(date){
    console.log(date);
    let d = new Date(date.year.value, date.month.value, date.day.value);
    return d.getFullYear() + '-' + this.formatDateMonth(d.getMonth()) + '-' + this.formatDateMonth(d.getDate());
  }

  orderCleaning(data: any){
    return new Promise((resolve, reject) => {
      this.getCredentials().then(res => {
        let user: any = res;
        let body = new FormData();
        let book_date = this.setDate(data.date_booking);

        body.append('date_booking', book_date);
        body.append('duration', data.duration);
        body.append('message', data.message);
        body.append('address', data.address);
        body.append('city', data.city);
        body.append('lng', data.lng);
        body.append('lat', data.lat);
        body.append('type_property', data.type_property);
        body.append('clean_area', data.clean_area);
        body.append('phone_no', data.phone_no);

        let url: string = this.baseURL + 'request-service/pembantu-rumah/' + user.id;
        this.http.post(url, body, this.httpOptions)
          .subscribe(res => {
            let response: any = res;
            resolve(response);
          }, err => {
            reject(err)
          })
      })
    });
  }

  orderCatering(data: any){
    return new Promise((resolve, reject) => {
      this.getCredentials().then(res => {
        let user: any = res;
        console.log(user);
        let body = new FormData();
        
        let book_date = this.setDate(data.date_booking);
        console.log(book_date);
        body.append('date_booking', book_date);
        body.append('type_event', data.type_event);
        body.append('message', data.message);
        body.append('address', data.address);
        body.append('city', data.city);
        body.append('state', data.state);
        body.append('total_visitor', data.total_visitor);
        body.append('phone_no', data.phone_no);

        let url: string = this.baseURL + 'request-service/katering/' + user.id;
        this.http.post(url, body, this.httpOptions)
          .subscribe(res => {
            let response: any = res;
            resolve(response);
          }, err => {
            reject(err)
          })
        resolve();
      })
     });
  }

  orderUrutPantang(data: any){
    return new Promise((resolve, reject) => {
      this.getCredentials().then(res => {
        let user: any = res;
        let url: string = this.baseURL + 'request-service/urut-pantang/' + user.id;
        let body = new FormData();
        let book_date = this.setDate(data.date_booking);
        body.append('date_booking', book_date);
        body.append('package', data.package);
        body.append('message', data.message);
        body.append('address', data.address);
        body.append('city', data.city);
        body.append('state', data.state);    
        body.append('phone_no', data.phone_no);

        this.http.post(url, body, this.httpOptions)
          .subscribe(res => {
            let response: any = res;
            resolve(response);
          }, err => {
            reject(err)
          })
      })
    });
  }

  viewOrderQuotation(job_id: any){
    return new Promise((resolve, reject) => {
      this.getCredentials().then(res => {
        let user: any = res;
        let body = new FormData();
        body.append('customer_id', user.id);

        let url: string = this.baseURL + 'customer/view-list-quotation/' + job_id;
        this.http.post(url, body, this.httpOptions)
          .subscribe(res => {
            let response: any = res;
            if(response.status != 'Token is Expired'){
              resolve(response);
            } else {
              reject('token expired');
            }
          }, err => {
            reject(err)
          })
      })
    });
  }

  viewJobStatus(){
    return new Promise((resolve, reject) => {
      this.getCredentials().then(res => {
        let user: any = res;

        let url: string = this.baseURL + 'job-request/customer-list/' + user.id;
        this.http.get(url, this.httpOptions)
          .subscribe(res => {
            let response: any = res;
            if(response.status != 'Token is Expired'){
              resolve(response);
            } else {
              reject('token expired');
            }
          }, err => {
            reject(err)
          })
      })
    });
  }

  getCredentials(){
    return new Promise((resolve, reject) => {
      this.auth.getData('USER').then(res => {
        let user: any = res;
        this.auth.getData('TOKEN').then(token => {
          let new_headers = new HttpHeaders({ 
            'Authorization': 'Bearer ' + token
          });
          this.httpOptions = { 
            headers: new_headers
          };
          resolve(JSON.parse(user));
        })
      }).catch( err => {
        reject(err);
      })
    })
  }

  orderStatus(){
    return new Promise((resolve, reject) => {
      this.getCredentials().then(res => {
        let user: any = res;
        let url: string = this.baseURL + 'customer/view-list-booking/' + user.id;
        this.http.get(url, this.httpOptions)
          .subscribe(res => {
            let response: any = res;
            if(response.list_booking){
              resolve(response.list_booking);
            } else {
              reject(response.error);
            }
          }, err => {
            reject(err)
          })
      })
    });
  }

  getService(url: string, id?: any){
    let _id: any = id || '';
    return new Promise((resolve, reject) => {
      this.getCredentials().then(res => {
        //let user: any = res;
        let _url: string = this.baseURL + url + _id;
        this.http.get(_url, this.httpOptions)
          .subscribe(res => {
            let response: any = res;
            if(response){
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

  acceptQuotation(provider_id: any, job_id: any){
    return new Promise((resolve, reject) => {
      this.getCredentials().then(res => {
        let user: any = res;
        let body = new FormData();
        body.append('customer_id', user.id);
        body.append('bitjob_id', provider_id);

        let url: string = this.baseURL + 'quotation/confirm-quotation/' + job_id;
        this.http.post(url, body, this.httpOptions)
          .subscribe(res => {
            let response: any = res;
            resolve(response);
          }, err => {
            reject(err)
          })
      })
    });
  }

}
