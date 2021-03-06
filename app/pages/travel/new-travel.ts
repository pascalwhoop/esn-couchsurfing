import {Component} from "@angular/core";
import {ViewController, Loading, NavController} from "ionic-angular/index";
import {AngularFire, FirebaseObjectObservable, FirebaseListObservable} from "angularfire2/angularfire2";
import {ArrayizePipe} from "../../pipes/arrayize";
import {AutoExpandDirective} from "../../directives/auto-expand";
import {SectionSelector} from "../../components/section-selection/section-selector";
import {Post, Section} from "../../model/Model";
import {FirebaseObservablesFactory} from "../../services/firebase-observables-factory";


@Component({
    template: `
    <ion-content padding>
        <h2>New couchsurfing request</h2>
        <ion-list no-lines>
            <ion-item>
                <ion-label floating>Message</ion-label>
                <ion-textarea [(ngModel)]="newPost.text"  txautoexpand></ion-textarea>
            </ion-item>
            <ion-item>
                <ion-label >Start</ion-label>
                    <ion-datetime displayFormat="DD MMM YYYY" [(ngModel)]="newPost.details.stay_start"></ion-datetime>
                <!--<ion-input [(ngModel)]="newPost.details.stay_start"  type="date"></ion-input>-->              
            </ion-item>
            <ion-item>
                <ion-label >End</ion-label>
                <ion-datetime displayFormat="DD MMM YYYY" [(ngModel)]="newPost.details.stay_end"></ion-datetime>
                <!--<ion-input [(ngModel)]="newPost.details.stay_end"  type="date"></ion-input>    -->          
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
    directives: [AutoExpandDirective, SectionSelector],
    providers: [FirebaseObservablesFactory]

})
export class NewTravelModal {

    newPost:Post;


    constructor(private navCtrl:NavController, private viewCtrl:ViewController, private backend: FirebaseObservablesFactory ) {

        this.newPost = {
            creator_name: "",
            details: {
                location: "",
                section_id: "",
                people: 1,
                stay_end: this.getDateString(),
                stay_start: this.getDateString()
            },
            text: "",
            timestamp: 0,
            user_uid: ""
        };

        backend.publicUserProfile().subscribe(res=>{
            if (!res.providerData[0]) return;
            let fbProfile = res.providerData[0];
            this.newPost.creator_name = fbProfile.displayName;
            this.newPost.user_uid = res.uid;
        })



    }

    sectionSelected(section: Section){
        this.newPost.details.section_id = section.subject_id;
        this.newPost.details.location = section.l;
    }

    submit() {
        this.newPost.timestamp = new Date().getTime();

        let loading = Loading.create({
            content: "Submitting ..."
        });
        this.navCtrl.present(loading);

        //when post done, destroy loading and dismiss current view
        let posts = this.backend.posts({}); //adding {} as parameter to get the .push which is not there if we
                                            // supply the defualt query for some reason
        posts.push(this.newPost).then(res=>{
            loading.destroy();
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

    getDateString(){
        return new Date().toISOString().slice(0,10)
    }
}