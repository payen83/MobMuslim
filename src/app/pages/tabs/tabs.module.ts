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
import { StatusDetailPageModule } from '../customer/status-detail/status-detail.module';
import { OrderDetailPageModule } from '../customer/order-detail/order-detail.module';

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
    // StatusDetailPageModule,
    // OrderDetailPageModule,
    RouterModule
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
