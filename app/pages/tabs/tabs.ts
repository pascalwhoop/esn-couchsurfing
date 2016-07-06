import {Component, ViewChild} from "@angular/core";
import {AllPage} from "../all/all";
import {HostPage} from "../host/host";
import {TravelPage} from "../travel/travel";
import {SettingsPage} from "../settings/settings";
import {AngularFireAuth, AngularFire} from "angularfire2/angularfire2";
import {Tabs} from "ionic-angular/index";


@Component({
    templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {

    @ViewChild("tabsComp")
    private tabsComp: Tabs;

    private all:any;
    private host:any;
    private travel:any;
    private settings:any;
    

    constructor(private af:AngularFire) {
        // this tells the tabs component which Pages
        // should be each tab's root Page
        this.all = AllPage;
        //this.all = SettingsPage; //todo develop only
        this.host = HostPage;
        this.travel = TravelPage;
        this.settings = SettingsPage;


        
    }
    
    public setTab(index : number){
        this.tabsComp.select(index);
    }
}
