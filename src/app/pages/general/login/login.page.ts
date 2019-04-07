import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, ModalController, Input } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { CommonService } from '../../../services/common/common.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  type: any;
  user: { email: string, password: string};
  register: {email: string, role: string, name: string, password: string, u_phone: string, password_confirmation: string}
  isRegister: boolean = false;
  constructor(public router: Router, 
    public navCtrl: NavController, 
    public auth: AuthService,
    private common: CommonService,
    private modalController: ModalController,
    private route: ActivatedRoute,
    ) { 
    this.user = { email: 'profitsventure@gmail.com', password: '123456'};
    this.register = { role: 'customer', email: null, password: null, name: null, u_phone: null, password_confirmation: null};
    // let type = this.route.snapshot.paramMap.get('type');
    

  }

  ngOnInit() {
    console.log(this.type)
    if(this.type == 'register'){
      this.isRegister = true;
    }
  }

  dismiss(){
    this.modalController.dismiss();
  }

  async openRegister(){
    const modal = await this.modalController.create({
      component: LoginPage,
      componentProps: { type: 'register' }
    });
    modal.onWillDismiss(data=>{
      //this.router.navigateByUrl('/tabs/(order:order)');
    })
    return await modal.present();
  }

  
  doLogin(){
    this.common.presentLoading();
    this.auth.login(this.user).then(res => {
      this.common.dismissLoading();
      console.log(res);
      let response: any = res;
      this.auth.saveData('TOKEN', response.access_token);
      this.auth.saveData('USER', JSON.stringify(response.users[0]));
      this.router.navigateByUrl('/tabs/(home:home)');
    }).catch(err=>{
      console.log('error login', err);
      this.common.dismissLoading();
    })
    
  }

  doRegister(){
    if(this.register.password == this.register.password_confirmation){
      this.common.presentLoading();
      this.auth.register(this.register).then(res => {
        this.common.dismissLoading();
        console.log(res);
        this.modalController.dismiss();
        this.common.presentAlert('Sign up successful. Please proceed with login','Sign Up')
      }).catch(err=>{
        console.log('error login', err);
        this.common.presentAlert(JSON.stringify(err),'Sign Up Error')
        this.common.dismissLoading();
      })
    } else {
      this.common.presentAlert('Your password and confirm password is not matched','Sign Up Error')
    }
  }

}
