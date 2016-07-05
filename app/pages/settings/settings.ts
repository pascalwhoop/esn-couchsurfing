import {Component} from "@angular/core";
import {AngularFire, AuthProviders, AuthMethods} from "angularfire2/angularfire2";

@Component({
    templateUrl: 'build/pages/settings/settings.html'
})
export class SettingsPage {


    login() {
        this.af.auth.login({
            provider: AuthProviders.Facebook,
            method: AuthMethods.Popup,
            scope: ['user_hometown']
        })
            .then(result => {
            console.log(result);
        })
            .catch((error:any) => {

            })
    }

    constructor(private af:AngularFire) {

    }
}
