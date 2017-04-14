import { Component, ElementRef, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
@Component({
    selector: 'dimmer-switch-widget',
    templateUrl: './dimmer-switch-widget.html'
}) export class DimmerSwitchWidgetComponent {

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