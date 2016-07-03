import {Component} from "@angular/core";
import {Platform, ionicBootstrap} from "ionic-angular";
import {StatusBar} from "ionic-native";
import {TabsPage} from "./pages/tabs/tabs";
import {defaultFirebase, FIREBASE_PROVIDERS, AngularFire} from "angularfire2";
import {FIREBASE_CONFIG} from "./services/config";
import {ServiceWorkerSingleton} from "./services/service-worker-install";




@Component({
    template: '<ion-nav [root]="rootPage"></ion-nav>',
})

export class MyApp {

    private rootPage:any;
    public af : AngularFire;

    constructor(
        private platform:Platform,
        af: AngularFire
    ) {
        //this.auth = auth;
        this.af = af;
        this.rootPage = TabsPage;


        platform.ready().then(() => {
            //installing service worker and registering updates when needed
            ServiceWorkerSingleton.registerServiceWorker();
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            StatusBar.styleDefault();
        });
    }
}

ionicBootstrap(MyApp,
    [
        FIREBASE_PROVIDERS,
        defaultFirebase(FIREBASE_CONFIG)
    ]);
