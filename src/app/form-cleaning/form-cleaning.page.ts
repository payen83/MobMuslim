import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-cleaning',
  templateUrl: './form-cleaning.page.html',
  styleUrls: ['./form-cleaning.page.scss'],
})
export class FormCleaningPage implements OnInit {
  selectOptions: any;
  constructor() { 
    this.selectOptions = {
      header: 'Kawasan yang perlu dibersihkan',
      subHeader:'Boleh pilih lebih dari satu pilihan',
      translucent: true
    };  
  }

  ngOnInit() {
  }

}
