import {Component, OnChanges, Input, SimpleChanges} from "@angular/core";
import {PostComment} from "../../model/Model";
import {AngularFire, FirebaseListObservable} from "angularfire2/angularfire2";

@Component({
    templateUrl: "build/components/post-reply/post-reply.html",
    selector: 'post-reply',
})
export class PostReply implements OnChanges{
    
    @Input()
    private postId: string;
    private commentsObservable : FirebaseListObservable<PostComment[]>;

    
    constructor(private af: AngularFire){
        
    }

    ngOnChanges(changes:SimpleChanges):any {
        for (let propName in changes) {
            if(propName == "postId"){
                let chng = changes[propName];
                if(chng.currentValue){
                    this.commentsObservable = this.af.database.list('/posts/' + chng.currentValue + '/comments');
                }
            }
        }
    }
    
    

    submit(message: string, hostingOffer: boolean){
        let user_uid = this.af.auth.subscribe(auth =>{

            let cmt : PostComment = {
                text: message,
                timestamp: new Date().getTime(),
                user_uid: auth.uid
            };
            this.commentsObservable.push(cmt);
        });

    }
}