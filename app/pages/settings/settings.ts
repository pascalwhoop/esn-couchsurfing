import {Component} from "@angular/core";
import {
    AngularFire, AuthProviders, AuthMethods, AngularFireAuth,
    FirebaseObjectObservable, FirebaseListObservable
} from "angularfire2/angularfire2";
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

    profile : FirebaseObjectObservable<PublicUserProfile>;
    //section : FirebaseListObservable<Section[]>;
    section : Section;
    edit: boolean = false;

    constructor(private backend: FirebaseObservablesFactory, private navC:NavController, private auth:AngularFireAuth, private af:AngularFire) {
        auth.subscribe(res =>{
            if(res){
                this.profile = af.database.object('/users/' + res.uid);
                this.profile.subscribe(res =>this.getSection(res));
            }
            
        })
    }

    getSection(profile : PublicUserProfile){
        this.af.database.list('/sections/', {
                query: {
                    orderByChild: 'subject_id',
                    equalTo: profile.section_uid,
                }
            }).subscribe(res=>{
            this.section = res[0];
            console.log(res);

        })

    }


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
        this.auth.logout();
        location.reload();
    }

    sectionSelected(section:Section) {
        this.af.auth.subscribe(res => {
            let uid = res.auth.uid;
            this.af.database.object('/users/' + uid + '/section_uid').set(section.subject_id).then(res => {
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
