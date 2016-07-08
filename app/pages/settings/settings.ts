import {Component} from "@angular/core";
import {AngularFire, AuthProviders, AuthMethods, AngularFireAuth} from "angularfire2/angularfire2";
import {NavController, Toast} from "ionic-angular/index";
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

    cleanAuthObject(usr:firebase.User):Model.PublicUserProfile {
        return {
            displayName: usr.displayName,
            email: usr.email,
            emailVerified: usr.emailVerified,
            isAnonymous: usr.isAnonymous,
            photoURL: usr.photoURL,
            providerData: usr.providerData,
            uid: usr.uid
        };

    }

    logout() {
        this.auth.logout();
        location.reload();
    }

    sectionSelected(section:Model.Section) {
        this.af.auth.subscribe(res => {
            let uid = res.auth.uid;
            this.af.database.object('/users/' + uid + '/section_uid').set(section.subject_id).then(res => {
                let toast =Toast.create(
                    {
                        message: 'Setion updated',
                        duration: 1500
                    });
                this.navC.present(toast);

            });

        })
    }


    constructor(private navC:NavController, private auth:AngularFireAuth, private af:AngularFire) {

    }
}
