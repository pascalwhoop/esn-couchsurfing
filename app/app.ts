import {Component} from '@angular/core';
import {Platform, ionicBootstrap} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {TabsPage} from './pages/tabs/tabs';
import * as firebase from 'firebase';


@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class MyApp {

  private rootPage:any;

  constructor(private platform:Platform) {
    this.rootPage = TabsPage;

    //initialize firebase application
    var config = {
      apiKey: "AIzaSyBS1K-mtgQ-iw6B1jbwsf9yDjhQcCIANPk",
      authDomain: "esn-couchsurfing.firebaseapp.com",
      databaseURL: "https://esn-couchsurfing.firebaseio.com",
      storageBucket: "esn-couchsurfing.appspot.com",
    };
    firebase.initializeApp(config);

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
}

ionicBootstrap(MyApp);
