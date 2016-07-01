import {Component} from '@angular/core'
import {auth} from 'firebase'

@Component({
    templateUrl: 'build/pages/settings/settings.html'
})
export class SettingsPage {

    fbAuthProvider;

    signInWithFacebook(){
        this.fbAuthProvider.addScope('user_hometown');
        
        auth().signInWithPopup(this.fbAuthProvider).then((result: any) => {
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            console.log(result);
            // ...
        }).catch((error: any) =>{
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        })
    }

    constructor() {
        this.fbAuthProvider = new auth.FacebookAuthProvider();
    }
}
