import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})
export class FormPage implements OnInit {
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
