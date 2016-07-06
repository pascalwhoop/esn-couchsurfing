import {Component} from "@angular/core";
import {AngularFire, AuthProviders, AuthMethods, AngularFireAuth, FirebaseAuthState} from "angularfire2/angularfire2";
import {NavController} from "ionic-angular/index";
import {AllPage} from "../all/all";
import {SectionSelector} from "../../components/section-selection/section-selector";
import {Model} from "../../model/Model";


@Component({
    templateUrl: 'build/pages/settings/settings.html',
    directives: [SectionSelector]
})
export class SettingsPage {

    login() {
        this.auth.login({
            provider: AuthProviders.Facebook,
            method: AuthMethods.Popup,
            scope: ['user_hometown']
        })
            .then(result => {
                this.navC.pop();
                let publicProfile = this.cleanAuthObject(result.auth);
                this.af.database.object('/users/' + result.auth.uid).set(publicProfile);
            })
            .catch((error:any) => {

            })
    }

    cleanAuthObject(usr : firebase.User) : Model.PublicUserProfile{
        return {
            displayName:usr.displayName,
            email:usr.email,
            emailVerified: usr.emailVerified,
            isAnonymous:usr.isAnonymous,
            photoURL:usr.photoURL,
            providerData:usr.providerData,
            uid:usr.uid
        };

    }
    
    logout(){
        this.auth.logout();
        location.reload();
    }


    constructor(private navC: NavController, private auth:AngularFireAuth, private af:AngularFire) {

    }
}
