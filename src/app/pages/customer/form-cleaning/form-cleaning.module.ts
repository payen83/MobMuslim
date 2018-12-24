import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FormCleaningPage } from './form-cleaning.page';

const routes: Routes = [
  {
    path: '',
    component: FormCleaningPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FormCleaningPage]
})
export class FormCleaningPageModule {}
