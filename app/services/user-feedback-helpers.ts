import {Loading, NavController, Toast} from "ionic-angular/index";
import {Injectable} from "@angular/core";


@Injectable()
export class FeedbackHelper {

    l:Loading;

    showLoading(navCtrl:NavController) {
        this.l = Loading.create({
            content: "loading ..."
        });
        navCtrl.present(this.l);
        console.log("show loading");


    }

    hideLoading() {
        this.l.destroy();
        console.log("hide loading");
    }

    oops(navC:NavController) {
        navC.present(Toast.create(
            {
                message: 'oops! something went wrong.',
                duration: 1500
            }))
    }
}