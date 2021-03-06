import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private oneSignal: OneSignal,
    private auth: AuthService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      //this.auth.clearStorage();
      this.oneSignal.startInit('59c8b5cd-60b0-4a47-a3b3-933b45c72677ioinc ', '961581634206');

      this.oneSignal.handleNotificationReceived().subscribe(() => {
      // do something when notification is received
      }, err => {

      });

      this.oneSignal.handleNotificationOpened().subscribe(() => {
      // do something when a notification is opened
      }, err => {
        
      });

      this.oneSignal.endInit();
    });
  }
}
