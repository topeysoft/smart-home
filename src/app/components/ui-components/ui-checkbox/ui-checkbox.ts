import { Component, Input, Output, EventEmitter, ElementRef } from '@angular/core';
@Component({
    selector: 'ui-checkbox',
    templateUrl: './ui-checkbox.html'
})
export class UiCheckboxComponent {
    /**
     *
     */
    constructor(private _hostRef: ElementRef) {
    }

    @Input() checked: boolean = false;
    @Input() label;
    @Input() checkedDisplay = '<i class="ion-android-checkbox-outline h3 text-primary"></i>';
    @Input() uncheckedDisplay = '<i class="ion-android-checkbox-outline-blank h3"></i>';
    @Output() checkedChange = new EventEmitter<any>();
    onChangeHandler(e) {
        var elem = this._hostRef.nativeElement.querySelector('input');
        if (elem) {
            this.checked = elem.checked;
            this.checkedChange.emit(this.checked);
        }
    }


    ngDoCheck() {

    }
}