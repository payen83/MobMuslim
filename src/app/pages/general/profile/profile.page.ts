import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { NavController } from '@ionic/angular';
import { CommonService } from '../../../services/common/common.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user: { name: string, email: string, u_phone: string, u_address: string, u_city: string, u_state: string, password?: string };
  confirm_password: string;
  constructor(public common: CommonService, public router: Router, private auth: AuthService, private navCtrl: NavController) { 
    this.user =   { name: null, email: null, u_phone: null, u_address: null, u_city: null, u_state: null, password: null };
  }

  ngOnInit() {
    this.auth.getData('USER').then(data => {
      let user: any = data;
      this.user = JSON.parse(user);
    })
  }

  saveProfile(){
    this.common.presentLoading();
    this.auth.updateUsers(this.user).then(()=>{
      this.common.dismissLoading();
      if(this.user.password){
        if((this.user.password == this.confirm_password)){
          this.auth.updatePassword(this.user.password).then(()=>{
            this.saveUser();
            this.common.presentAlert('Your profile and password has been updated')
          })
        } else {
          this.common.presentAlert('Your password and confirm password is not matched')
        }
      } else {
        this.saveUser();
        this.common.presentAlert('Your profile has been updated')
      }
    }, err =>{

    })
  }

  saveUser(){
    if(this.user.hasOwnProperty('password')){
      delete this.user['password'];
    };
    this.auth.saveData('USER', JSON.stringify(this.user))
  }

  logout(){
    //this.router.navigateByUrl('/Login');
    this.navCtrl.goRoot('/Login');
  }

}
