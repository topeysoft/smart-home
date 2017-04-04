import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, HostBinding } from '@angular/core';

import $ from "jquery";

@Component({
    selector:'ui-textarea',
    templateUrl:'./textarea.html'
})
export class UiTextAreaComponent{
   @ViewChild('textarea') inputRef:ElementRef;   
    @HostBinding('class.empty') empty: boolean = true;

   @Input() label:string='';
   @Input() placeholder:string='';
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
      this.empty=!$(this.inputRef.nativeElement).find('input').val()
                    ||$(this.inputRef.nativeElement).find('input').val().length<1;
   }
}