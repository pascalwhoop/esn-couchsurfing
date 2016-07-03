import {Component, Input} from "@angular/core";
import {Model} from "../../model/Model";
import {AngularFire, FirebaseDatabase, FirebaseListObservable} from "angularfire2/angularfire2";
import {QueryTemplates} from '../../services/query-templates';
import * as moment from 'moment';
import {TimeAgoPipe, FromUnixPipe} from "angular2-moment/index";






@Component({
    templateUrl: 'build/components/post-card/post-card.html',
    selector: 'post-card',
    pipes: [TimeAgoPipe, FromUnixPipe],

})
export class PostCard{
    
    @Input()
    post : Model.Post;

    _creator : FirebaseListObservable<Model.PublicUserProfile[]>;

    private db : FirebaseDatabase;
    
    constructor(af : AngularFire){
        this.db = af.database;
    }
    
    get creator() : FirebaseListObservable<Model.PublicUserProfile[]>{
        if(!this._creator){
            this._creator = this.db.list('/users', {query: QueryTemplates.userQuery(this.post.user_uid) });
        }
        return this._creator;
    }


}