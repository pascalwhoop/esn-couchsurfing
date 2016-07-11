import {Component} from "@angular/core";
import {NavController, Modal} from "ionic-angular";
import {NewTravelModal} from "./new-travel";
import {AngularFire, FirebaseListObservable} from "angularfire2/angularfire2";
import {PostCard} from "../../components/post-card/post-card";
import {ReversePipe} from "../../pipes/reverse";
import {FirebaseObservablesFactory} from "../../services/firebase-observables-factory";
import {FeedbackHelper} from "../../services/user-feedback-helpers";


@Component({
    templateUrl: 'build/pages/travel/travel.html',
    directives: [PostCard],
    pipes: [ReversePipe],
    providers:[FirebaseObservablesFactory]
})
export class TravelPage {

    posts:FirebaseListObservable<any>;

    constructor(private nc:NavController, private backend: FirebaseObservablesFactory) {
        
        backend.publicUserProfile().subscribe(res=>{
            this.posts = backend.postsPerUser(res.uid, true);
        }, err =>{
        });
    }

    showNewTravelModal() {
        let modal = Modal.create(NewTravelModal);
        this.nc.present(modal);
    }
}                