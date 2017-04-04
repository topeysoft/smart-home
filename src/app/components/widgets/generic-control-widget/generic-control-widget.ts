import { Component } from '@angular/core';
@Component({
    selector:'generic-control-widget',
    templateUrl:'./generic-control-widget.html'
}) export class GenericControlWidgetComponent{

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

getEventLocation(element,event){
    var pos = this.getElementPosition(element);
    
    return {
    	x: (event.pageX - pos.x),
      	y: (event.pageY - pos.y)
    };
}
}