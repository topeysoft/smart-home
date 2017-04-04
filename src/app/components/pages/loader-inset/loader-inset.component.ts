import { Component, Input } from '@angular/core';
@Component({
    selector:'loader-inset',
    templateUrl:'./loader-inset.component.html',
   
}) 
export class TsLoaderInsetComponent{
   @Input() relative:boolean=false;
   @Input() text:string="loading...";
   @Input() displayText:string="";
}