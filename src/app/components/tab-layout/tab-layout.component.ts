import { Input, Component, Type } from '@angular/core';
import { TabViewModel } from '../../models/TabsViewModel';
import { DevicesPageComponent } from '../pages/devices/page-devices.component';
@Component({
    selector:'tab-layout',
    templateUrl:'./tab-layout.component.html'
})
export class TsTabLayoutComponent{

    tabs:TabViewModel[]; 
   @Input() title:string="";

   /**
    *
    */
   constructor() {
       this.tabs = [
         {name:'Devices', icon:'ion-ios-lightbulb-outline', title:'Devices', viewComponentType: DevicesPageComponent },   
         {name:'Shortcuts', icon:'ion-ios-bolt-outline', title:'My Shortcuts', viewComponentType: DevicesPageComponent },   
         {name:'Smarties', icon:'ion-ios-color-wand-outline', title:'Smart Stuff',  viewComponentType: DevicesPageComponent }   
       ];
   }
}