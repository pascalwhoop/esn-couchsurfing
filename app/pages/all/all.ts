import {Component} from "@angular/core";
import {NavController, Popover} from "ionic-angular";
import {LoginPopover} from "../settings/login-popover";
import database = firebase.database;

import {Model} from "../../model/Model";
import DataSnapshot = firebase.database.DataSnapshot;
import {PostCard} from "../../components/post-card/post-card";
import {AngularFire, FirebaseListObservable, AngularFireAuth} from "angularfire2/angularfire2";

@Component({
    templateUrl: 'build/pages/all/all.html',
    directives: [PostCard]
})
export class AllPage {
    
    posts: FirebaseListObservable<any>;
    auth : any;


    constructor(private navController:NavController, private af: AngularFire) {
        this.posts = af.database.list('posts');

        af.auth.subscribe(auth =>{
            console.log(auth);
            this.auth = auth;
        })
    }

    showLoginPopup() {
        let popover = Popover.create(LoginPopover);
        this.navController.present(popover);
    }


}
