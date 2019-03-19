import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user: { name: string, email: string, phone: string, address: string, city: string, state: string, password?: string };

  constructor(public router: Router, private auth: AuthService, private navCtrl: NavController) { 
      this.user =   { name: null, email: null, phone: null, address: null, city: null, state: null, password: null };
  }

  ngOnInit() {
    this.auth.getData('USER').then(data => {
      let user: any = data;
      this.user = JSON.parse(user);
    })
  }

  saveProfile(){

  }

  logout(){
    //this.router.navigateByUrl('/Login');
    this.navCtrl.goRoot('/Login');
  }



}
