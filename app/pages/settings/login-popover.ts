import {Component} from '@angular/core';
import {SettingsPage} from "./settings";

@Component({
    template: '<button (click)="triggerFBPopup()">Login with FB</button>',
    providers: [SettingsPage]
})
export class LoginPopover {
    triggerFBPopup(){
        this.settings.signInWithFacebook();
    }
    
    constructor(private settings : SettingsPage) {
    }
}
