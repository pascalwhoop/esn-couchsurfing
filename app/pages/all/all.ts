import {Component} from "@angular/core";
import {NavController, Popover, InfiniteScroll} from "ionic-angular";
import database = firebase.database;
import DataSnapshot = firebase.database.DataSnapshot;
import {PostCard} from "../../components/post-card/post-card";
import {AngularFire, FirebaseListObservable, AngularFireAuth} from "angularfire2/angularfire2";
import {SettingsPage} from "../settings/settings";
import {ReversePipe} from "../../pipes/reverse";
import {FirebaseObservablesFactory} from "../../services/firebase-observables-factory";
import {Post} from "../../model/Model";

@Component({
    templateUrl: 'build/pages/all/all.html',
    directives: [PostCard],
    pipes: [ReversePipe],
    providers: [FirebaseObservablesFactory]
})
export class AllPage {

    posts: Post[];

    auth : any;
    pagingFlag: Post;



    constructor(private backend: FirebaseObservablesFactory, private navController:NavController) {
        backend.latestPosts().subscribe((res)=>this.pushNew(res));
        this.posts = [];
    }

    pushNew(newPosts : Post[]){
        //sorting newly received array by timestamp (old to new --> unix timecode ascending)
        newPosts.sort((a,b)=>{
            return a.timestamp > b.timestamp ? 1 : -1;
        });
        //get first object (oldest one) and remove. we use this for paging later
        this.pagingFlag = newPosts.shift(); //removing first (is last after reverse
        //reverse array --> new to old
        newPosts.reverse();




        newPosts.forEach(val=>this.posts.push(val));
    }

    showSettings() {
        this.navController.push(SettingsPage);
    }

    doInfinite(infiniteScroll: InfiniteScroll){

        this.backend.latestPosts(this.pagingFlag).subscribe((res)=>{
            this.pushNew(res);
            infiniteScroll.complete();
        });
    }


}
