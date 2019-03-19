import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPage } from './pages/general/login/login.page';

const routes: Routes = [
  { path: '', component: LoginPage},
  { path: 'Tabs', loadChildren: './pages/tabs/tabs.module#TabsPageModule' },
  { path: 'Favourite', loadChildren: './pages/customer/favourite/favourite.module#FavouritePageModule' },
  { path: 'Profile', loadChildren: './pages/general/profile/profile.module#ProfilePageModule' },
  { path: 'Orders', loadChildren: './pages/customer/orders/orders.module#OrdersPageModule' },
  { path: 'Login', loadChildren: './pages/general/login/login.module#LoginPageModule' },
  { path: 'Form', loadChildren: './pages/customer/form/form.module#FormPageModule' },
  { path: 'OrderDetail/:id', loadChildren: './pages/customer/order-detail/order-detail.module#OrderDetailPageModule' },
  { path: 'StatusDetail/:id', loadChildren: './pages/customer/status-detail/status-detail.module#StatusDetailPageModule' },
  { path: 'CompanyDetails', loadChildren: './pages/customer/company-details/company-details.module#CompanyDetailsPageModule' },
  { path: 'FormCatering', loadChildren: './pages/customer/form-catering/form-catering.module#FormCateringPageModule' },
  { path: 'FormConfinement', loadChildren: './pages/customer/form-confinement/form-confinement.module#FormConfinementPageModule' },
  { path: 'FormCleaning', loadChildren: './pages/customer/form-cleaning/form-cleaning.module#FormCleaningPageModule' },
  { path: 'Accepted', loadChildren: './pages/customer/accepted/accepted.module#AcceptedPageModule' },
  { path: 'FormCompleted', loadChildren: './pages/customer/form-completed/form-completed.module#FormCompletedPageModule' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
