import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  constructor(public router: Router, public navCtrl: NavController){

  }
  openForm(type){
    if(type == 'cleaning') {
      this.navCtrl.goForward('FormCleaning');
    } else if (type=='catering') {
      this.navCtrl.goForward('FormCatering');
    } else if (type=='confinement') {
      this.navCtrl.goForward('FormConfinement');
    }
  }

}
