import {NgZone, Injectable} from "@angular/core";
import auth = firebase.auth;
import User = firebase.User;
import {MyApp} from "../app";

declare var window;

@Injectable()
export class Auth{
    
    user: User;
    
    constructor(private _ngZone: NgZone){
        //check for user state
        auth().onAuthStateChanged((user) => {
            if (user || auth().currentUser) {
                this._ngZone.run(()=>{this.user = user;});
            } else {
                this.user = null;
                console.log("Not logged in")

            }
        });
    }
}