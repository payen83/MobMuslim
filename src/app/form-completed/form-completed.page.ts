import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-form-completed',
  templateUrl: './form-completed.page.html',
  styleUrls: ['./form-completed.page.scss'],
})
export class FormCompletedPage implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  dismiss(){
    this.modalController.dismiss();
  }

}
