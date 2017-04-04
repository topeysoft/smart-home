import { Component, Input, ViewChild, ElementRef, EventEmitter, Output, HostBinding } from '@angular/core';
import $ from "jquery";
@Component({
    selector: 'ui-dropdown',
    templateUrl: './dropdown.component.html'
})
export class UiDropDownComponent {
    /**
     *
     */
    constructor(private hostRef: ElementRef) {
    }
    @HostBinding('class.empty') empty: boolean = true;
    @Input() @HostBinding('class.invalid') invalid: boolean = false;
    selected: string = '';
    @Output() selectedItemChange = new EventEmitter<any>();
    @Input() selectedIndex: number;
    @Input() selectedItem: any;
    @Input() label: string;
    @Input() groupField: string;
    @Input() iconAction = () => { };
    @Input() icon: string;
    @Input() optionField: string;
    @Input() placeholder: string = 'Begin typing to see options...';
    @Input() items: any[] = [];

    @Input() @HostBinding('class.border-shown') showBorder: boolean = true;
    @HostBinding('class.label-shown') showLabel: boolean = true;
    @HostBinding('class.focused') focused: boolean = false;
    open: boolean = false;
    actives: any[] = [];
    ngAfterViewInit() {
        $(document.body).on('click', (e) => {
            if (!$(e.target).is(this.hostRef.nativeElement) && !$.contains(this.hostRef.nativeElement, e.srcElement)) {
                this.open = false;
            }
        });

        if (this.selectedIndex) this.selectItemByIndex(this.selectedIndex);
    }

    onValueChange(item) {
        this.selectedItemChange.emit(this.selectedItem);
    }
    unselectAll() {
        this.items.forEach((item, i) => {
            this.actives[i] = { active: false };
        });
    }

    setFocus(focus: boolean) {
        this.focused = focus;
        this.open = this.focused;

    }

    keyCodes = { arrowDown: 40, arrowUp: 38, enter: 13, escape: 27 };
    keypress(e: KeyboardEvent) {
        this.open = true;
        if (e.keyCode == this.keyCodes.arrowDown) {
            this.scrollDown();
        } else if (e.keyCode == this.keyCodes.arrowUp) {
            this.scrollUp();
        } else if (e.keyCode == this.keyCodes.enter) {
            this.selectItem();
        } else if (e.keyCode == this.keyCodes.escape) {
            this.open = false;
        }
    }


    selectItemByIndex(index) {
        this.selectedIndex = index;
        this.selectedItem = this.items[this.selectedIndex];
        if (this.optionField) {
            this.selected = this.selectedItem[this.optionField];
        }
        // else {
        //     this.selected = this.selectedItem;
        // }
        this.unselectAll();
        this.open = false;
        this.selectedItemChange.emit(this.selectedItem);
    }
    selectItem() {
        var curIndex = this.actives.findIndex(a => a.active);
        this.selectItemByIndex(curIndex);
    }
    scrollDown() {
        var curIndex = this.actives.findIndex(a => { return a.active });
        curIndex++;
        if (curIndex >= this.actives.length) curIndex = 0;
        this.actives.forEach((a) => { a.active = false });
        this.actives[curIndex] = { active: true };

    }
    scrollUp() {
        var curIndex = this.actives.findIndex(a => { return a.active }) || this.items.length;
        curIndex--;
        if (curIndex < 0) curIndex = this.items.length - 1;
        this.unselectAll();
        this.actives[curIndex] = { active: true };
    }


    ngDoCheck() {
        if (this.selectedItem) {
            if (this.optionField) {
                this.selected = this.selectedItem[this.optionField];
            } else {
                this.selected = this.selectedItem;
            }
        }
        if ((this.items && this.actives) && (this.actives.length !== this.items.length)) { this.unselectAll() };
        if (this.selectedIndex) this.actives[this.selectedIndex] = { active: true };

    }
}
