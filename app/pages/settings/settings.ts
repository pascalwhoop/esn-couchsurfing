import {Component} from "@angular/core";
import {AuthProviders, AuthMethods, FirebaseObjectObservable} from "angularfire2/angularfire2";
import {NavController, Toast} from "ionic-angular/index";
import {SectionSelector} from "../../components/section-selection/section-selector";
import {Section, PublicUserProfile} from "../../model/Model";
import {FirebaseObservablesFactory} from "../../services/firebase-observables-factory";



@Component({
    templateUrl: 'build/pages/settings/settings.html',
    directives: [SectionSelector],
    providers: [FirebaseObservablesFactory]
})
export class SettingsPage {

    profile:FirebaseObjectObservable<PublicUserProfile>;
    //section : FirebaseListObservable<Section[]>;
    section:Section;
    edit:boolean = false;

    constructor(private navC:NavController,

                private backend:FirebaseObservablesFactory) {

        backend.auth().subscribe(res => {
            if (res) {
                this.profile = backend.publicUserProfile(res.uid);
                this.profile.subscribe(res =>this.getSection(res));
            }

        })
    }

    getSection(profile:PublicUserProfile) {
        if(profile.section_uid){
            this.backend.section(profile.section_uid, true)
                .subscribe(res=> {
                    this.section = res[0];
                    console.log(res);
                });
        }

    }


    login() {
        this.backend.auth().login({
            provider: AuthProviders.Facebook,
            method: AuthMethods.Popup,
            scope: ['user_hometown']
        })
            .then(result => {
                this.navC.pop();
                let publicProfile = this.cleanAuthObject(result.auth);
                this.backend.publicUserProfile(result.auth.uid).set(publicProfile);
            })
            .catch((error:any) => {

            })
    }

    cleanAuthObject(usr:firebase.User):PublicUserProfile {
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
        this.backend.auth().logout();
        location.reload();
    }

    sectionSelected(section:Section) {
        this.backend.auth().subscribe(res => {
            let uid = res.auth.uid;
            this.backend.publicUserProfile(uid + '/section_uid').set(section.subject_id).then(res => {
                let toast = Toast.create(
                    {
                        message: 'Setion updated',
                        duration: 1500
                    });
                this.navC.present(toast);

            });

        })
    }


}
