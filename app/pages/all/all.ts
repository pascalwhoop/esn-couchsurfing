import {Component} from "@angular/core";
import {NavController, Popover} from "ionic-angular";
import database = firebase.database;
import DataSnapshot = firebase.database.DataSnapshot;
import {PostCard} from "../../components/post-card/post-card";
import {AngularFire, FirebaseListObservable, AngularFireAuth} from "angularfire2/angularfire2";
import {SettingsPage} from "../settings/settings";
import {ReversePipe} from "../../pipes/reverse";

@Component({
    templateUrl: 'build/pages/all/all.html',
    directives: [PostCard],
    pipes: [ReversePipe]
})
export class AllPage {
    
    posts: FirebaseListObservable<any>;
    auth : any;


    constructor(private navController:NavController, private af: AngularFire) {
        this.posts = af.database.list('posts', {
            query: {
                orderByChild: 'timestamp',
                limitToLast: 30
            }
        });
    }

    showSettings() {
        this.navController.push(SettingsPage);
    }


}
