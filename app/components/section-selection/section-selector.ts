import {Component, Output, EventEmitter, Input} from "@angular/core";
import {ArrayizePipe} from "../../pipes/arrayize";
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from "angularfire2/angularfire2";
import {} from "../../model/Model";
import {Section} from "../../model/Model";

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
                    <ion-option *ngFor="let s of (sections| async) | arrayize:'value':display" [value]="s.value">{{
                    s.value[display]}}</ion-option>
                </ion-select>              
            </ion-item>
        `,
    pipes: [ArrayizePipe]
})
export class SectionSelector {

    countries:FirebaseObjectObservable<any>;
    sections:FirebaseListObservable<Section[]>;

    @Input()
    display: string = "l";


    @Output()
    onSectionSelected: EventEmitter<Section> = new EventEmitter<Section>();


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
    }

    sectionSelected(section: Section){
        this.onSectionSelected.emit(section);
    }

}