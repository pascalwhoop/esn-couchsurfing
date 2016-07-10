import {Injectable} from "@angular/core";
import {
    AngularFire,
    FirebaseDatabase, AngularFireAuth, FirebaseListObservable, FirebaseObjectObservable
} from "angularfire2/angularfire2";
import {Post, PublicUserProfile, Section} from "../model/Model";
import {Query} from "angularfire2/es6/utils/query_observable";
import {Observable} from "rxjs/Rx";
import User = firebase.User;


@Injectable()
export class FirebaseObservablesFactory {

    private db:FirebaseDatabase;
    private PAGE_SIZE = 10;

    constructor(private af:AngularFire) {
        this.db = af.database;
    }

    latestPosts(endAt?:Post):FirebaseListObservable<Post[]> {
        let query:Query = {
            orderByKey: true,
            limitToLast: this.PAGE_SIZE,
        };
        if (endAt) query.endAt = endAt.$key;

        return this.posts(query);
    }

    postsPerLocation(location:string) {
        let query:Query = {
            orderByChild: 'details/location',
            equalTo: location,
            limitToLast: this.PAGE_SIZE
        };
        return this.posts(query);
    }

    postsPerUser(uid:string) {
        let query:Query = {
            orderByChild: 'user_uid',
            equalTo: uid,
            limitToLast: this.PAGE_SIZE
        };
        return this.posts(query);
    }

    /**
     * core posts query. Takes a query object or uses a default one
     * @param query
     * @returns {FirebaseListObservable<any[]>}
     */
    posts(query?:Query):FirebaseListObservable<any[]> {
        query = query ? query : {
            orderByKey: true,
            limitToLast: this.PAGE_SIZE,
        };

        return this.db.list('posts', {query: query});

    }

    /**
     *
     * @param uid the uid for the user profile to fetch
     * @returns {FirebaseObjectObservable<PublicUserProfile>}
     */
    publicUserProfile(uid?:string):FirebaseObjectObservable<PublicUserProfile> {
        return FirebaseObjectObservable.create(observer => {
            if (uid) {
                this.af.database.object('/users/' + uid).subscribe(res=> {
                    observer.next(res);
                    observer.complete();
                })
            } else {
                this.af.auth.subscribe(res => {
                    let publicUser = this.af.database.object('/users/' + res.uid);
                    publicUser.subscribe(res => {
                        observer.next(res);
                        observer.complete();
                    })

                })
            }
        });
    }

    auth():AngularFireAuth{
        return this.af.auth;
    }

    section(uid:string):FirebaseListObservable<Section[]> {
        return this.af.database.list('sections', {
            query: {
                orderByChild: 'subject_id',
                equalTo: uid
            }
        });
    }

}