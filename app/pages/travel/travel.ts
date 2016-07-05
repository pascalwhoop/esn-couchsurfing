import {Component} from '@angular/core';
import {NavController, Modal} from 'ionic-angular';
import {NewTravelModal} from "./new-travel";

@Component({
  templateUrl: 'build/pages/travel/travel.html'
})
export class TravelPage {
  constructor(private nc: NavController) {
  }

  showNewTravelModal() {
    let modal = Modal.create(NewTravelModal);
    this.nc.present(modal);
  }
}                