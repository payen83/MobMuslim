import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabsPage } from './tabs.page';
import { HomePage } from '../general/home/home.page';
import { OrdersPage } from '../customer/orders/orders.page';
import { FavouritePage } from '../customer/favourite/favourite.page';
import { ProfilePage } from '../general/profile/profile.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        outlet: 'home',
        component: HomePage
      },
      {
        path: 'order',
        outlet: 'order',
        component: OrdersPage
      },
      {
        path: 'favourite',
        outlet: 'favourite',
        component: FavouritePage
      },
      {
        path: 'profile',
        outlet: 'profile',
        component: ProfilePage
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/(home:home)',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
