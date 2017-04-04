import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, HostBinding } from '@angular/core';
@Component({
    selector:'ui-textarea',
    templateUrl:'./textarea.html'
})
export class UiTextAreaComponent{
   @ViewChild('textarea') inputRef:ElementRef;
   @Input() label:string='';
   @Input() disabled:string='';
   @Input() value:string='';
   @Input() minRow:number=3;
   @Output() valueChange= new EventEmitter<string>();

    @Input() @HostBinding('class.border-shown') showBorder:boolean=true;
    @HostBinding('class.label-shown') showLabel:boolean=false;
    @HostBinding('class.focused') focused:boolean=false;
    onValueChange(e:Event){
        this.value = this.inputRef.nativeElement.value;
        this.valueChange.emit(this.value);
    }

    setFocus(focus:boolean){
        this.focused =focus;
        if(!this.focused){ this.showLabel=true; }
    }
   ngAfterViewInit(){
   }
   ngDoCheck(){
     if(this.value && this.value.length>0 && !this.focused){
        this.showLabel=true;
     } else if(this.focused){
         this.showLabel=false;
     }
   }
}