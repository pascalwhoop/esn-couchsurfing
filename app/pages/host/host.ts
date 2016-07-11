import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from "angularfire2/angularfire2";
import {PostCard} from "../../components/post-card/post-card";
import {ReversePipe} from "../../pipes/reverse";
import {Post, PublicUserProfile, Section} from "../../model/Model";
import {FirebaseObservablesFactory} from "../../services/firebase-observables-factory";


@Component({
    templateUrl: 'build/pages/host/host.html',
    directives: [PostCard],
    pipes: [ReversePipe],
    providers: [FirebaseObservablesFactory]
})
export class HostPage {

    posts:FirebaseListObservable<Post[]>;
    section: FirebaseListObservable<Section[]>;

    constructor(private nc:NavController, private backend : FirebaseObservablesFactory) {
        backend.publicUserProfile().subscribe(res =>{
            console.log("user profile response: ");
            console.log(res);

            backend.section(res.section_uid).subscribe(res=>{
                this.setPostsFor(res[0].l);
            })
        });
    }
    
    setPostsFor(location: string){
        this.posts = this.backend.postsPerLocation(location, true);
    }
}
