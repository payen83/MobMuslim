import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(public router: Router, public navCtrl: NavController) { }

  ngOnInit() {
  }

  doLogin(){
    this.router.navigateByUrl('/tabs/(home:home)');
  }

}
