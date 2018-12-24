import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { OneSignal } from '@ionic-native/onesignal/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageModule } from './pages/general/login/login.module';
import { TabsPageModule } from './pages/tabs/tabs.module';
import { AcceptedPageModule } from './pages/customer/accepted/accepted.module';
import { FormCompletedPageModule } from './pages/customer/form-completed/form-completed.module';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    RouterModule, 
    LoginPageModule, 
    TabsPageModule, 
    AcceptedPageModule, 
    FormCompletedPageModule,
    IonicStorageModule.forRoot(),
    HttpClientModule],
  providers: [
    StatusBar,
    SplashScreen,
    OneSignal,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
