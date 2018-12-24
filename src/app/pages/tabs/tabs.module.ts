import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs.router.module';

import { TabsPage } from './tabs.page';
import { HomePageModule } from '../general/home/home.module';
import { OrdersPageModule } from '../customer/orders/orders.module';
import { ProfilePageModule } from '../general/profile/profile.module';
import { FavouritePageModule } from '../customer/favourite/favourite.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    HomePageModule,
    OrdersPageModule,
    ProfilePageModule,
    FavouritePageModule,
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
