import {Component, Input, OnInit} from "@angular/core";
import {
    AngularFire,
    FirebaseDatabase,
    FirebaseListObservable,
    FirebaseObjectObservable,
    FirebaseAuth
} from "angularfire2/angularfire2";
import {TimeAgoPipe, FromUnixPipe, DateFormatPipe} from "angular2-moment/index";
import {NavController} from "ionic-angular/index";
import {PostComment} from "../post-comment/post-comment";
import {PostReply} from "../post-reply/post-reply";
import {ReversePipe} from "../../pipes/reverse";
import {PublicUserProfile, Post} from "../../model/Model";


@Component({
    templateUrl: 'build/components/post-card/post-card.html',
    selector: 'post-card',
    directives: [PostComment, PostReply],
    pipes: [TimeAgoPipe, FromUnixPipe, ReversePipe, DateFormatPipe],

})
export class PostCard implements OnInit {

    @Input()
    post:Post;
    creator:FirebaseObjectObservable<PublicUserProfile>;
    comments:FirebaseListObservable<Comment[]>;


    private db:FirebaseDatabase;
    private nav:NavController;
    private auth:FirebaseAuth;

    constructor(af:AngularFire, nav:NavController) {
        this.auth = af.auth;
        this.db = af.database;
        this.nav = nav;
    }


    ngOnInit():any {
        this.setCreator(this.post.user_uid);
        this.setComments(this.post.$key);
    }

    private setComments(postId:string) {
        this.comments = this.db.list('/posts/' + postId + '/comments', {query: {orderByChild: 'timestamp'}});
    }

    private setCreator(userUid:string):void {
        this.creator = this.db.object('/users/' + userUid);
    }


}