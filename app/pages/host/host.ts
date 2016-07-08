import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from "angularfire2/angularfire2";
import {PostCard} from "../../components/post-card/post-card";
import {ReversePipe} from "../../pipes/reverse";
import {Post, PublicUserProfile, Section} from "../../model/Model";


@Component({
    templateUrl: 'build/pages/host/host.html',
    directives: [PostCard],
    pipes: [ReversePipe]
})
export class HostPage {

    posts:FirebaseListObservable<Post[]>;
    publicUser : FirebaseObjectObservable<PublicUserProfile>;
    section: FirebaseListObservable<Section[]>;

    constructor(private nc:NavController, private af:AngularFire) {

        af.auth.subscribe(res =>{
            this.publicUser = af.database.object('/users/' + res.uid);
            this.publicUser.subscribe(res =>{
                this.fetchSection(res.section_uid);
            })

        })
    }

    fetchSection(uid: string){
        this.section= this.af.database.list('sections' , {
            query: {
                orderByChild: 'subject_id',
                equalTo: uid
            }
        });
        this.section.subscribe(res =>{
            this.setPostsFor(res[0].l);
        })
    }

    setPostsFor(location: string){
        this.posts = this.af.database.list('posts', {
            query: {
                orderByChild: 'details/location',
                equalTo: location
            }
        });
    }

}
