import { Component, Input } from '@angular/core';
@Component({
    selector:'loader-page',
    templateUrl:'./loader-page.component.html',
   
}) 
export class TsLoaderPageComponent{
   @Input() relative:boolean=false;
   @Input() text:string="loading...";
   @Input() displayText:string="";
}