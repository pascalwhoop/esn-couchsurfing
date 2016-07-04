import {Component, Input, OnChanges, SimpleChanges} from "@angular/core";
import {Model} from "../../model/Model";
import {AngularFire, FirebaseDatabase, FirebaseObjectObservable} from "angularfire2/angularfire2";
import {TimeAgoPipe, FromUnixPipe} from "angular2-moment/index";







@Component({
    templateUrl: 'build/components/post-comment/post-comment.html',
    selector: 'post-comment',
    pipes: [TimeAgoPipe, FromUnixPipe],

})
export class PostComment implements OnChanges{

    @Input()
    comment : Model.Comment;

    creator :FirebaseObjectObservable<Model.PublicUserProfile>;

    private db : FirebaseDatabase;

    constructor(af : AngularFire){
        this.db = af.database;
    }


    ngOnChanges(changes:SimpleChanges):any {
        for (let propName in changes) {
            if(propName == "comment"){
                let chng = changes[propName];
                let uid = chng.currentValue ? chng.currentValue.user_uid : null;
                if(uid) this.setCreator(uid);
            }
        }
    }

    private setCreator(userUid : string): void {
        this.creator = this.db.object('/users/' + userUid);
    }


}