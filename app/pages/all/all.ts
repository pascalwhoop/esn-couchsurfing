import {Component} from "@angular/core";
import {NavController, Popover} from "ionic-angular";
import {LoginPopover} from "../settings/login-popover";
import {Auth} from "../../services/auth";
import database = firebase.database;

import {Model} from "../../model/Model";
import DataSnapshot = firebase.database.DataSnapshot;
import * as _ from "underscore";
import {PostCard} from "../../components/post-card/post-card";
import {AngularFire, FirebaseListObservable} from "angularfire2/angularfire2";

@Component({
    templateUrl: 'build/pages/all/all.html',
    providers: [Auth],
    directives: [PostCard]
})
export class AllPage {
    
    posts: FirebaseListObservable<any>;
    postsArray(){
        if(!this.posts) return [];
        else return _.values(this.posts);

    }

    constructor(
        private navController:NavController,
        private auth: Auth,
        af: AngularFire) {

        this.posts = af.database.list('posts');
    }

    showLoginPopup() {
        let popover = Popover.create(LoginPopover);
        this.navController.present(popover);
    }


}
