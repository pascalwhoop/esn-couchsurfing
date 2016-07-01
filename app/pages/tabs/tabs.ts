import {Component} from '@angular/core'
import {AllPage} from '../all/all';
import {HostPage} from '../host/host';
import {TravelPage} from '../travel/travel';
import {SettingsPage} from '../settings/settings';

@Component({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {

  private all: any;
  private host: any;
  private travel: any;
  private settings: any;

  constructor() {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    this.all = AllPage;
    this.host= HostPage;
    this.travel= TravelPage;
    this.settings= SettingsPage;
  }
}
