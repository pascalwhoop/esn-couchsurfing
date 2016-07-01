import {Component} from "@angular/core";
import {NavController, Popover} from "ionic-angular";
import {LoginPopover} from "../settings/login-popover";
import {Auth} from "../../services/auth";
import database = firebase.database;
import {Model} from "../../model/Model";
import DataSnapshot = firebase.database.DataSnapshot;
import * as _ from "underscore";
import {PostCard} from "../../components/post-card/post-card";

@Component({
    templateUrl: 'build/pages/all/all.html',
    providers: [Auth],
    directives: [PostCard]
})
export class AllPage {
    
    posts: Map<String, any>;
    postsArray(){
        if(!this.posts) return [];
        else return _.values(this.posts);

    }

    constructor(
        private navController:NavController,
        private auth: Auth) {

        console.log("getting stuff from DB");
        let postsRef = database().ref('posts/');
        postsRef.once('value').then((snapshot : DataSnapshot)=>{
            this.posts = snapshot.val();
        })
    }

    showLoginPopup() {
        let popover = Popover.create(LoginPopover);
        this.navController.present(popover);
    }


}
