import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user: { email: string, password: string};
  constructor(public router: Router, public navCtrl: NavController, public auth: AuthService) { 
    this.user = { email: 'profitsventure@gmail.com', password: '123456'}
  }

  ngOnInit() {
  }

  doLogin(){
    this.auth.login(this.user).then(res => {
      console.log(res);
      let response: any = res;
      this.auth.saveData('TOKEN', response.access_token);
      this.auth.saveData('USER', JSON.stringify(response.users[0]));
      this.router.navigateByUrl('/tabs/(home:home)');
    }).catch(err=>{
      console.log('error login', err)
    })
    
  }

}
