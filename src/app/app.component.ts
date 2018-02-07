import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase';

import { TabsPage } from '../pages/tabs/tabs';
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';
import { AuthService } from '../services/auth.service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;
  signinPage: any = SigninPage;
  signupPage: any = SignupPage;
  isAuthenticated: boolean = false;
  @ViewChild('nav') nav: NavController;

  constructor(platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private menuCtrl: MenuController,
    private authService: AuthService) {
    // init firebase (firebase web setup data)
    firebase.initializeApp({
      apiKey: "AIzaSyDRa-IgtCX_D69MhRWcbCb3xJ9v0ekuCW0",
      authDomain: "ionic2-recipebook-69dd9.firebaseapp.com"
    });
    // check if user is authenticated
    // this triggers whenever auth state is changed
    firebase.auth().onAuthStateChanged(user => {
      // set different rootpage
      if (user) {
        this.isAuthenticated = true;
        this.rootPage = TabsPage;
      } else {
        this.isAuthenticated = false;
        this.rootPage = SigninPage;
      }
    });
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  onLoad(page: any) {
    console.log('on load');
    // navigate to page
    this.nav.setRoot(page);
    this.menuCtrl.close();
  }

  onLogout() {
    console.log('logout');
    this.authService.logOut();
    this.menuCtrl.close();

    // navigate to signin page
    this.nav.setRoot(SigninPage);
  }
}
