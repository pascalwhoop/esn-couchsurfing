import {Injectable} from "@angular/core";
import {
    AngularFire,
    FirebaseDatabase,
    AngularFireAuth,
    FirebaseListObservable,
    FirebaseObjectObservable
} from "angularfire2/angularfire2";
import {Post, PublicUserProfile, Section} from "../model/Model";
import {Query} from "angularfire2/es6/utils/query_observable";
import {FeedbackHelper} from "./user-feedback-helpers";
import {NavController} from "ionic-angular";
import {FirebaseListFactoryOpts} from "angularfire2/utils/firebase_list_factory";
import {FirebaseObjectFactoryOpts} from "angularfire2/utils/firebase_object_factory";
import User = firebase.User;


@Injectable()
export class FirebaseObservablesFactory {

    private db:FirebaseDatabase;
    private PAGE_SIZE = 10;

    constructor(private af:AngularFire, private l:FeedbackHelper, private nc:NavController) {
        this.db = af.database;
    }

    latestPosts(endAt?:Post, blocking?:boolean):FirebaseListObservable<Post[]> {
        let query:Query = {
            orderByKey: true,
            limitToLast: this.PAGE_SIZE,
        };
        if (endAt) query.endAt = endAt.$key;

        return this.posts(query, blocking);
    }

    comments(postUid:string, blocking?:boolean) {
        return this.list('/posts/' + postUid + '/comments', undefined, blocking);
    }

    postsPerLocation(location:string, blocking?:boolean) {
        let query:Query = {
            orderByChild: 'details/location',
            equalTo: location,
            limitToLast: this.PAGE_SIZE
        };
        return this.posts(query, blocking);
    }

    postsPerUser(uid:string, blocking?:boolean) {
        let query:Query = {
            orderByChild: 'user_uid',
            equalTo: uid,
            limitToLast: this.PAGE_SIZE
        };
        return this.posts(query, blocking);
    }

    /**
     * core posts query. Takes a query object or uses a default one
     * @param query
     * @param blocking indicate whether we show loading or not
     * @returns {FirebaseListObservable<Post[]>}
     */
    posts(query?:Query, blocking?:boolean):FirebaseListObservable<Post[]> {
        query = query ? query : {
            orderByKey: true,
            limitToLast: this.PAGE_SIZE,
        };

        return this.list('posts', {query: query}, blocking);
    }

    /**
     * generic wrapper for the af2 list function. with the last flag, the calling code can request a loading ...
     * overlay that blocks user interaction until the request has either completed or failed
     * @param urlOrRef
     * @param opts
     * @param blocking
     * @returns {FirebaseListObservable<any[]>}
     */
    list(urlOrRef:string | firebase.database.Reference, opts?:FirebaseListFactoryOpts, blocking?:boolean):FirebaseListObservable<any[]> {
        if (blocking) this.l.showLoading(this.nc);
        let obs = this.db.list(urlOrRef, opts);
        //hide loading on first answer from server and unsubscribe
        let dispo = obs.subscribe(res=> {
            //hack. sometimes this gets called synchronously which is annoying because dispo is not yet set..
            setTimeout(()=>{
                if (blocking) this.l.hideLoading();
                dispo.unsubscribe();
            }, 1)
        }, err=> {
            if (blocking) this.l.hideLoading();
        });
        return obs;
    }

    /**
     * generic wrapper for the af2 object function. with the last flag, the calling code can request a loading ...
     * overlay that blocks user interaction until the request has either completed or failed
     * @param urlOrRef
     * @param opts
     * @param blocking
     * @returns {FirebaseObjectObservable<any>}
     */
    object(urlOrRef:string | firebase.database.Reference, opts?:FirebaseObjectFactoryOpts, blocking?:boolean):FirebaseObjectObservable<any> {
        if (blocking) this.l.showLoading(this.nc);
        let obs = this.db.object(urlOrRef, opts);
        //hide loading on first answer from server and unsubscribe

        let dispo = obs.subscribe(res=> {
            //hack. sometimes this gets called synchronously which is annoying because dispo is not yet set..
            setTimeout(()=> {
                if (blocking) this.l.hideLoading();
                dispo.unsubscribe();
            }, 1)

        }, err=> {
            if (blocking) this.l.hideLoading();
        });


        return obs;
    }

    /**
     *
     * @param uid the uid for the user profile to fetch
     * @param blocking
     * @returns {FirebaseObjectObservable<PublicUserProfile>}
     */
    publicUserProfile(uid?:string):FirebaseObjectObservable<PublicUserProfile> {
        if (uid) return this.object('/users/' + uid);

        return new FirebaseObjectObservable<PublicUserProfile>(subscriber => {
            this.af.auth.subscribe(res => {
                this.object('/users/' + res.uid).subscribe(res=> {
                    subscriber.next(res);
                })
            })
        });



    }

    auth():AngularFireAuth {

        return this.af.auth;
    }

    section(uid:string, blocking?:boolean):FirebaseListObservable<Section[]> {
        console.log("getting sections filtered by: " + uid);

        return this.list('sections', {
            query: {
                orderByChild: 'subject_id',
                equalTo: uid
            }
        }, blocking);
    }

}