import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'ui-tab',
  templateUrl: './ui-tab.component.html'
})
export class UiTabComponent {

 @Input() tabArray:any[]=[];
 @Input() tabAnimation='fadeIn';
  constructor( private changeDetectionRef:ChangeDetectorRef, private vcRef:ViewContainerRef) { }

  handleTabClick(index){
    this.tabArray.forEach(item=>{ item.active=false;})
    this.tabArray[index].active=true;
  }

  ngAfterViewInit() {
    if(this.tabArray && this.tabArray.length>0 ){
      if(this.tabArray.every(item=>{return !item.active;})){
        this.tabArray[0].active=true;
      }
      this.tabArray.forEach((item)=>{
        if(item && item.template){
        }
       })
      
    }
    this.changeDetectionRef.detectChanges()
  }

}
