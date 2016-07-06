import {Component} from "@angular/core";
import {NavController, Modal} from "ionic-angular";
import {NewTravelModal} from "./new-travel";
import {AngularFire, FirebaseListObservable} from "angularfire2/angularfire2";
import {PostCard} from "../../components/post-card/post-card";

@Component({
    templateUrl: 'build/pages/travel/travel.html',
    directives: [PostCard]
})
export class TravelPage {

    posts:FirebaseListObservable<any>;

    constructor(private nc:NavController, private af:AngularFire) {
        af.auth.subscribe(res => {
            if (!res.auth.uid) return;
            let uid = res.auth.uid;
            this.posts = af.database.list('posts', {
                query: {
                    orderByChild: 'user_uid',
                    equalTo: uid
                }
            });
        });
    }

    showNewTravelModal() {
        let modal = Modal.create(NewTravelModal);
        this.nc.present(modal);
    }
}                