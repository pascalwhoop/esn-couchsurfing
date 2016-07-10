import {Component, OnChanges, Input, SimpleChanges, Output, EventEmitter} from "@angular/core";
import {PostComment} from "../../model/Model";
import {FirebaseListObservable} from "angularfire2/angularfire2";
import {FirebaseObservablesFactory} from "../../services/firebase-observables-factory";
import {Loading, NavController, Toast} from "ionic-angular/index";

@Component({
    templateUrl: "build/components/post-reply/post-reply.html",
    selector: 'post-reply',
})
export class PostReply implements OnChanges {

    @Input()
    private postId:string;
    private commentsObservable:FirebaseListObservable<PostComment[]>;

    @Output()
    onPosted: EventEmitter<PostComment> = new EventEmitter<PostComment>();

    constructor(private backend:FirebaseObservablesFactory, private navCtrl : NavController) {

    }

    ngOnChanges(changes:SimpleChanges):any {
        for (let propName in changes) {
            if (propName == "postId") {
                let chng = changes[propName];
                if (chng.currentValue) {
                    this.commentsObservable = this.backend.comments(chng.currentValue);
                }
            }
        }
    }


    submit(message:string, hostingOffer:boolean) {

        //create loading notification
        let loading = Loading.create({
            content: "Submitting ..."
        });
        this.navCtrl.present(loading);

        //get uid for user and submit
        this.backend.auth().subscribe((auth)=> {
            //build comment object
            let cmt:PostComment = {
                text: message,
                timestamp: new Date().getTime(),
                user_uid: auth.uid
            };

            this.commentsObservable.push(cmt).then(resolve =>{
                console.log(resolve);
                loading.destroy();
                this.onPosted.emit(cmt);
                let toast = Toast.create(
                    {
                        message: 'posted!',
                        duration: 1000
                    });
                this.navCtrl.present(toast);
            });
        });

    }
}