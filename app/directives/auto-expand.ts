import {Directive, ElementRef, OnDestroy, OnInit} from "@angular/core";

@Directive({selector: '[txautoexpand]'})
export class AutoExpandDirective implements OnInit, OnDestroy {


    ngOnInit():any {
        let textarea = this.el.nativeElement.getElementsByTagName('textarea')[0];
        textarea.addEventListener('keyup', event => {
            //due to http://stackoverflow.com/questions/10722058/height-of-textarea-increases-when-value-increased-but-does-not-reduce-when-value
            textarea.style.height = 1 + 'px';
            textarea.style.height = textarea.scrollHeight + "px";
        })
    }

    ngOnDestroy():any {
        return null;
    }

    constructor(private el:ElementRef) {

    }
}
