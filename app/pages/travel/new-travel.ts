import {Component} from "@angular/core";
import {ViewController, Loading, NavController} from "ionic-angular/index";
import {AngularFire, FirebaseObjectObservable, FirebaseListObservable} from "angularfire2/angularfire2";
import {Model} from "../../model/Model";
import {ArrayizePipe} from "../../pipes/arrayize";
import {AutoExpandDirective} from "../../directives/auto-expand";
import {SectionSelector} from "../../components/section-selection/section-selector";


@Component({
    template: `
    <ion-content padding>
        <h2>New couchsurfing request</h2>
        <ion-list>
            <ion-item>
                <ion-label floating>Message</ion-label>
                <ion-textarea [(ngModel)]="newPost.text"  txautoexpand></ion-textarea>
            </ion-item>
            <ion-item>
                <ion-label >Start</ion-label>
                <ion-input [(ngModel)]="newPost.details.stay_start"  type="date"></ion-input>              
            </ion-item>
            <ion-item>
                <ion-label >End</ion-label>
                <ion-input [(ngModel)]="newPost.details.stay_end"  type="date"></ion-input>              
            </ion-item>
            <ion-item>
                <ion-label># of People</ion-label>
                <ion-input [(ngModel)]="newPost.details.people"  type="number" (value)="1"></ion-input>              
            </ion-item>
            
            <!--Selecting where to go ... 2 stage process: Country -- Section / City -->
            <section-selector (onSectionSelected)="sectionSelected($event)"></section-selector>
                       
            <ion-row>
                <ion-col width="33">
                    <button danger full (click)="cancel()">Cancel</button>    
                </ion-col>
                <ion-col width="67">
                    <button full 
                    (click)="submit()"
                    [disabled]="submitReady()"
                    >Submit</button>    
                </ion-col>
            </ion-row>
          
                      
        </ion-list>
    </ion-content>
        `,
    pipes: [],
    directives: [AutoExpandDirective, SectionSelector]

})
export class NewTravelModal {

    newPost:Model.Post;


    constructor(private navCtrl:NavController, private viewCtrl:ViewController, private af:AngularFire) {

        this.newPost = {
            creator_name: "",
            details: {
                location: "",
                section_id: "",
                people: 1,
                stay_end: "",
                stay_start: ""
            },
            text: "",
            timestamp: 0,
            user_uid: ""
        };

        this.af.auth.subscribe(res => {
            if (!res.auth.providerData[0]) return;
            let fbProfile = res.auth.providerData[0];
            this.newPost.creator_name = fbProfile.displayName;
            this.newPost.user_uid = res.auth.uid;
        })


    }

    sectionSelected(section: Model.Section){
        this.newPost.details.section_id = section.subject_id;
        this.newPost.details.location = section.l;
    }

    submit() {
        this.newPost.timestamp = new Date().getTime();
        this.af.database.list("/posts/").push(this.newPost);

        let loading = Loading.create({
            content: "Please wait...",
            duration: 500
        });
        this.navCtrl.present(loading).then(()=> {
            this.viewCtrl.dismiss();
        });

        //todo handle offline case #6 https://github.com/pascalwhoop/esn-couchsurfing/issues/6

    }

    submitReady() {
        let p = this.newPost;
        return !(p.user_uid && p.creator_name && p.text && p.details.location && p.details.stay_start && p.details.stay_end )
    }

    cancel() {
        this.viewCtrl.dismiss();
    }
}