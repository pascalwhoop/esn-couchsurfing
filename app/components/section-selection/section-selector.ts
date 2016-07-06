import {Component, Output, EventEmitter} from "@angular/core";
import {ArrayizePipe} from "../../pipes/arrayize";
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from "angularfire2/angularfire2";
import {Model} from "../../model/Model";

@Component({
    selector: 'section-selector',
    template:
        `
            <ion-item>
                <ion-label>Country</ion-label>
                <ion-select [(ngModel)]="country" (ngModelChange)="countrySelected($event)">
                    <ion-option *ngFor="let c of (countries | async) | arrayize: 'value' " [value]="c.key">{{c.value}}
                    </ion-option>
                </ion-select>              
            </ion-item>
            <ion-item *ngIf="country">
                <ion-label>City / Section</ion-label>
                <ion-select [(ngModel)]="section"  (ngModelChange)="sectionSelected($event)">
                    <ion-option *ngFor="let s of (sections| async) | arrayize: 'value:l'" [value]="s.value">{{
                    s.value.l}}</ion-option>
                </ion-select>              
            </ion-item>
        `,
    pipes: [ArrayizePipe]
})
export class SectionSelector {

    countries:FirebaseObjectObservable<any>;
    sections:FirebaseListObservable<Model.Section[]>;

    @Output()
    onSectionSelected: EventEmitter<Model.Section> = new EventEmitter<Model.Section>();


    constructor(private af : AngularFire){
        this.countries = af.database.object('/countries');
    }

    countrySelected(countryCode:string) {
        this.sections = this.af.database.list('sections', {
            query: {
                orderByChild: 'c',
                equalTo: countryCode
            }
        });
        this.sections.subscribe(res=>{
            console.log(res);
        })
    }

    sectionSelected(section: Model.Section){
        this.onSectionSelected.emit(section);
    }

}