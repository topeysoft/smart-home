import { Component, HostBinding, ElementRef } from '@angular/core';
import { TsNavigationService } from '../../../services/navigation/navigation-service';
import $ from "jquery";

@Component({
    selector:'ts-left-menu',
    templateUrl:'./left-menu.component.html',
   
})
export class LeftMenuComponent{
    @HostBinding('class.show')  visible:boolean = false;
    constructor(private _hostRef:ElementRef, private navigator:TsNavigationService) {
      $(this._hostRef.nativeElement).on('click touch', '#overlay', (e)=> {
                this.navigator.showLeftMenu=false;
        });
        this.navigator.onNavigationEnd.subscribe((data)=>{
             this.navigator.showLeftMenu=false;
        })
    //   $(this._hostRef.nativeElement).on('click touch', 'li', (e)=> {
    //             this.navigator.showLeftMenu=false;
    //     });
    }

    itemAction(item){
         item.action();
    }
    ngDoCheck(){
        this.visible=this.navigator.showLeftMenu;
    }
}