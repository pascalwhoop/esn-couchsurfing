import {Component, Input, OnChanges, SimpleChanges} from "@angular/core";
import {Model} from "../../model/Model";
import {
    AngularFire,
    FirebaseDatabase,
    FirebaseListObservable,
    FirebaseObjectObservable,
    FirebaseAuth
} from "angularfire2/angularfire2";
import {TimeAgoPipe, FromUnixPipe} from "angular2-moment/index";
import {NavController} from "ionic-angular/index";
import {PostComment} from "../post-comment/post-comment";
import {PostReply} from "../post-reply/post-reply";
import {ReversePipe} from "../../pipes/reverse";


@Component({
    templateUrl: 'build/components/post-card/post-card.html',
    selector: 'post-card',
    directives: [PostComment, PostReply],
    pipes: [TimeAgoPipe, FromUnixPipe, ReversePipe],

})
export class PostCard implements OnChanges {

    @Input()
    post:Model.Post;
    creator:FirebaseObjectObservable<Model.PublicUserProfile>;
    comments:FirebaseListObservable<Model.Comment[]>;


    private db:FirebaseDatabase;
    private nav:NavController;
    private auth:FirebaseAuth;

    constructor(af:AngularFire, nav:NavController) {
        this.auth = af.auth;
        this.db = af.database;
        this.nav = nav;
    }


    ngOnChanges(changes:SimpleChanges):any {
        //watch for setting of input variable and then set creator
        for (let propName in changes) {
            if (propName == "post") {
                let chng = changes[propName];
                console.log("post changed");

                this.setCreator(chng.currentValue.user_uid);
                this.setComments("post" + chng.currentValue.timestamp);
            }
        }
    }

    private setComments(postId:string) {
        this.comments = this.db.list('/posts/' + postId + '/comments', {query: {orderByChild: 'timestamp'}});
    }

    private setCreator(userUid:string):void {
        this.creator = this.db.object('/users/' + userUid);
    }


}