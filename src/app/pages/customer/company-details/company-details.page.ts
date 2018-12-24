import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.page.html',
  styleUrls: ['./company-details.page.scss'],
})
export class CompanyDetailsPage implements OnInit {
  solid = false;
  constructor(private toastController: ToastController) { }

  ngOnInit() {
  }

  changeFill(){
    this.solid = !this.solid;
    if (this.solid){
      this.presentToast();
    }
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'This company has been bookmarked.',
      duration: 2000,
      cssClass: "toastBackground"
    });
    toast.present();
  }

  isSolid(){
    return this.solid == true;
  }

}
