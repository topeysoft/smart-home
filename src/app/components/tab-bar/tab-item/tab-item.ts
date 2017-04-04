import { Component, Input } from '@angular/core';
@Component({
    selector:'tab-item',
    templateUrl:'./tab-item.html'
})
export class TsTabItemComponent{
    @Input() name:string;
    @Input() icon:string;
}