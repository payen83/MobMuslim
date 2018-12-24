import { Injectable } from '@angular/core';
// import { resolve } from 'path';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseURL: string = 'http://mobilemuslim.elyzian.xyz/api';
  httpOptions: any;

  constructor(public http: HttpClient, private storage: Storage) { 
    this.getData('TOKEN').then(token=>{
      let new_headers = new HttpHeaders({ 
        'Authorization': 'Bearer ' + token
      });
      this.httpOptions = { 
        headers: new_headers
      };
    })
  }

  login(user: any) {
    console.log('user ', JSON.stringify(user))
    let url: string = this.baseURL + '/auth/login';
    return new Promise((resolve, reject) => {
      this.http.post(url, user)
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
    });
  }

  saveData(key: string, value: string){
    this.storage.set(key, value);
  }

  getData(key){
    return new Promise((resolve, reject) => {
      this.storage.get(key).then((val) => {
        resolve(val);
      }, err => {
        reject(err);
      });
    });
  }

  updateUsers(data){
    return new Promise((resolve, reject) => {
      this.getData('USER').then(res => {
        let response: any = res;
        let user: any = JSON.parse(response);
        let url: string = this.baseURL + '/users/update-profile/' + user.id;
        let body = new FormData();

        body.append('u_address', data.u_address);
        body.append('u_phone', data.u_phone);
        body.append('message', data.message);
        body.append('address', data.address);
  
          this.http.post(url, body, this.httpOptions)
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
