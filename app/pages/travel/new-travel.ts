import {Component} from "@angular/core";
import {ViewController} from "ionic-angular/index";
import {AngularFire, FirebaseObjectObservable, FirebaseListObservable} from "angularfire2/angularfire2";
import {Model} from "../../model/Model";
import {ArrayizePipe} from "../../pipes/arrayize";
import {AutoExpandDirective} from "../../directives/auto-expand";


@Component({
    template: `
    <ion-content padding>
        <h2>New couchsurfing request</h2>
        <form action="submit()">
            <ion-item>
                <ion-label floating>Message</ion-label>
                <ion-textarea #message txautoexpand></ion-textarea>
            </ion-item>
            <ion-item>
                <ion-label >Start</ion-label>
                <ion-input #start type="date"></ion-input>              
            </ion-item>
            <ion-item>
                <ion-label >End</ion-label>
                <ion-input #end type="date"></ion-input>              
            </ion-item>
            <ion-item>
                <ion-label># of People</ion-label>
                <ion-input #people type="number"></ion-input>              
            </ion-item>
            
            <!--Selecting where to go ... 2 stage process: Country -- Section / City -->
            <ion-item>
                <ion-label>Country</ion-label>
                <ion-select [(ngModel)]="country" (ngModelChange)="countrySelected($event)">
                    <ion-option *ngFor="let c of (countries | async) | arrayize: 'value' " value="{{c.key}}">{{c.value}}
                    </ion-option>
                </ion-select>              
            </ion-item>
            <ion-item *ngIf="country">
                <ion-label>City / Section</ion-label>
                <ion-select #city>
                    <ion-option *ngFor="let c of (sections| async) | arrayize" (value)="c.key.subject_id">{{
                    c.value.sectionname}}</ion-option>
                </ion-select>              
            </ion-item>
            

        </form>
        <button (click)="close()">Close</button>
    </ion-content>
        `,
    pipes: [ArrayizePipe],
    directives: [AutoExpandDirective]
})
export class NewTravelModal {

    countries:FirebaseObjectObservable<any>;
    sections:FirebaseListObservable<any>;

    request : Model.Post;

    constructor(private viewCtrl:ViewController, private af:AngularFire) {
        this.countries = af.database.object('/countries');

    }

    countrySelected(countryCode:string) {
        this.sections = this.af.database.list('sections', {
            query: {
                orderByChild: 'c',
                equalTo: countryCode
            }
        })
    }

    submit() {

    }

    cancel() {

    }
}