import { Component, ElementRef, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
@Component({
    selector: 'wall-outlet-widget',
    templateUrl: './wall-outlet-widget.html'
}) export class WallOutletWidgetComponent {

    @Input() color:string = '#76b5ff';
    constructor(private _host: ElementRef) {

    }
    ngOnInit() {
    }
    getElementPosition(obj) {
        var curleft = 0, curtop = 0;
        if (obj.offsetParent) {
            do {
                curleft += obj.offsetLeft;
                curtop += obj.offsetTop;
            } while (obj = obj.offsetParent);
            return { x: curleft, y: curtop };
        }
        return undefined;
    }

    getEventLocation(element, event) {
        var pos = this.getElementPosition(element);

        return {
            x: (event.pageX - pos.x),
            y: (event.pageY - pos.y)
        };
    }
}