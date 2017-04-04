import { Component, Input, Output, EventEmitter, ElementRef } from '@angular/core';
@Component({
    selector:'ui-checkbox',
    templateUrl:'./ui-checkbox.html'
})
export class UiCheckboxComponent{
    /**
     *
     */
    constructor(private  _hostRef:ElementRef) {
    }

     checked:boolean=false;
    @Input() label;
    @Input() checkedDisplay='<i class="ion-android-checkbox-outline h3 text-primary"></i>';
    @Input() uncheckedDisplay='<i class="ion-android-checkbox-outline-blank h3"></i>';
    @Input() value;
    @Output() valueChange= new EventEmitter<any>();
    valueChanged(e){
       this.valueChange.emit(this.value);
    }

  
    ngDoCheck(){
      var elem =  this._hostRef.nativeElement.querySelector('input');
      if(elem) this.checked = elem.checked;
    }
}