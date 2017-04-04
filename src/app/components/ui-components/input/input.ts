import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, HostBinding } from '@angular/core';
import $ from "jquery";

@Component({
    selector: 'ui-input',
    templateUrl: './input.html'
})
export class UiInputComponent {

 constructor(private hostRef: ElementRef) {
    }
    @HostBinding('class.empty') empty: boolean = true;
   @Input() @HostBinding('class.invalid') invalid: boolean = false;
    @ViewChild('input') inputRef: ElementRef;
    @Input() icon: string;
    @Input() iconAction=()=>{};
    @Input() type: string = '';
    @Input() placeholder: string = '';
    @Input() label: string = '';
    @Input() value: string = '';
    @Output() valueChange = new EventEmitter<string>();

    @Input() @HostBinding('class.border-shown') showBorder: boolean = true;
    @HostBinding('class.label-shown') showLabel: boolean = false;
    @HostBinding('class.focused') focused: boolean = false;
    onValueChange(e: Event) {
        this.value = this.inputRef.nativeElement.value;
        this.valueChange.emit(this.value);
    }

    setFocus(focus: boolean) {
        this.focused = focus;
        if (!this.focused) { this.showLabel = true; }
    }
    ngAfterViewInit() {
    }
    ngDoCheck() {
        if (this.value && this.value.length > 0 && !this.focused) {
            this.showLabel = true;
        } else if (this.focused) {
            this.showLabel = false;
        }
        this.empty=!$(this.hostRef.nativeElement).find('input').val()
                    ||$(this.hostRef.nativeElement).find('input').val().length<1;
    }
}