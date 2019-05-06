import { Injectable } from '@angular/core';
// import { resolve } from 'path';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseURL: string = 'https://mobilemuslim.elyzian.xyz/api';
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

  register(user: any) {
    console.log('user ', JSON.stringify(user))
    let url: string = this.baseURL + '/auth/regtr';
    return new Promise((resolve, reject) => {
      this.http.post(url, user)
      .subscribe(res => {
        let response: any = res;
        if(response.user){
          resolve(response);
        } else {
          reject(response.error);
        }
      }, err => {
        reject(err)
      })
    });
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
    return new Promise((resolve, reject)=>{
      this.storage.set(key, value).then(()=>{
        resolve()
      },err => {
        reject()
      });
    })
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

  clearStorage(){
    return new Promise((resolve, reject) => {
      this.storage.clear().then(() => {
        resolve();
      }, err => {
        reject(err);
      });
    });
  }

  updatePassword(password: any){
    return new Promise((resolve, reject) => {
      this.getData('USER').then(res => {
        let response: any = res;
        let user: any = JSON.parse(response);
        let url: string = this.baseURL + '/users/change-password/' + user.id;
        let body = new FormData();
  
        body.append('password', password);
        this.http.post(url, body, this.httpOptions)
        .subscribe(res => {
          let response: any = res;
          if(response.status){
            resolve(response);
          } else {
            reject(response);
          }
        }, err => {
          reject(err)
        })
      })
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
        body.append('u_state', data.state);
        body.append('u_city', data.u_city);
        body.append('u_postcode', data.u_postcode);
        body.append('name', data.name);
  
          this.http.post(url, body, this.httpOptions)
          .subscribe(res => {
            let response: any = res;
            if(response.status){
              resolve(response);
            } else {
              reject(response);
            }
          }, err => {
            reject(err)
          })
      })
    });
  }

}
