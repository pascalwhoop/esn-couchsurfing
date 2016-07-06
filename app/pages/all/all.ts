import {Component} from "@angular/core";
import {NavController, Popover} from "ionic-angular";
import database = firebase.database;
import {Model} from "../../model/Model";
import DataSnapshot = firebase.database.DataSnapshot;
import {PostCard} from "../../components/post-card/post-card";
import {AngularFire, FirebaseListObservable, AngularFireAuth} from "angularfire2/angularfire2";
import {SettingsPage} from "../settings/settings";

@Component({
    templateUrl: 'build/pages/all/all.html',
    directives: [PostCard]
})
export class AllPage {
    
    posts: FirebaseListObservable<any>;
    auth : any;


    constructor(private navController:NavController, private af: AngularFire) {
        this.posts = af.database.list('posts');
    }

    showSettings() {
        this.navController.push(SettingsPage);
    }


}
