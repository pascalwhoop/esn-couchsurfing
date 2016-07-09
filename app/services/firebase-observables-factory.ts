import {Injectable} from "@angular/core";
import {AngularFire, FirebaseDatabase, FirebaseListObservable} from "angularfire2/angularfire2";
import {Post} from "../model/Model";
import {Query} from "angularfire2/es6/utils/query_observable";


@Injectable()
export class FirebaseObservablesFactory {

    private db : FirebaseDatabase;

    constructor(private af: AngularFire){
        this.db = af.database;
    }

    latestPosts(endAt?: Post) : FirebaseListObservable<Post[]>{

        let query : Query = {
            orderByKey: true,
            limitToLast: 10,
        };
        if(endAt) query.endAt = endAt.$key;

        return this.db.list('posts', {query: query});
    }
}