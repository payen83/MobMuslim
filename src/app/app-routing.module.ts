import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPage } from './login/login.page';
import { TabsPage } from './tabs/tabs.page';


const routes: Routes = [
  // { path: '', loadChildren: './tabs/tabs.module#TabsPageModule'},
  { path: '', component: LoginPage},
  // { path: '', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'Tabs', loadChildren: './tabs/tabs.module#TabsPageModule' },
  // { path: 'Tabs', component: TabsPage },
  { path: 'Favourite', loadChildren: './favourite/favourite.module#FavouritePageModule' },
  { path: 'Profile', loadChildren: './profile/profile.module#ProfilePageModule' },
  { path: 'Orders', loadChildren: './orders/orders.module#OrdersPageModule' },
  { path: 'Login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'Form', loadChildren: './form/form.module#FormPageModule' },
  { path: 'OrderDetail', loadChildren: './order-detail/order-detail.module#OrderDetailPageModule' },
  { path: 'CompanyDetails', loadChildren: './company-details/company-details.module#CompanyDetailsPageModule' },
  { path: 'FormCatering', loadChildren: './form-catering/form-catering.module#FormCateringPageModule' },
  { path: 'FormConfinement', loadChildren: './form-confinement/form-confinement.module#FormConfinementPageModule' },
  { path: 'FormCleaning', loadChildren: './form-cleaning/form-cleaning.module#FormCleaningPageModule' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
