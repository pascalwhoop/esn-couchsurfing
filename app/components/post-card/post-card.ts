import {Component, Input} from "@angular/core";
import {Model} from "../../model/Model";

@Component({
    templateUrl: 'build/components/post-card/post-card.html',
    selector: 'post-card'
})
export class PostCard{
    
    @Input()
    post : Model.Post;


}