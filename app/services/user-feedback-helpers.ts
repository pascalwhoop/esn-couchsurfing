import {Loading, NavController, Toast} from "ionic-angular";
import {Injectable} from "@angular/core";


@Injectable()
export class FeedbackHelper {

    constructor(){
        console.log("instance created!" + new Date().getTime());
        this.count = 0;
    }

    l:Loading;
    count:number;

    showLoading(navCtrl:NavController) {
        
        this.count++;
        //increase requester count by one and if already over 0, return
        console.log("+c is: " + this.count);

        if (this.count-1 || this.l) return;
        //count was 0, we create a loading and show it.
        this.l = Loading.create({
            content: "loading ..."
        });
        navCtrl.present(this.l);
        console.log("show loading");
    }

    hideLoading() {
        this.count < 1 ? this.count = 0 : --this.count;
        console.log("-c is: " + this.count);
        if (!this.count && this.l) {
            this.l.destroy();
            this.l = null;
            console.log("hide loading ");
        }
    }

    oops(navC:NavController) {
        navC.present(Toast.create(
            {
                message: 'oops! something went wrong.',
                duration: 1500
            }))
    }
}