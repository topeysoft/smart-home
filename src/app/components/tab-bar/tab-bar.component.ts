import { ElementRef, Component, Input } from '@angular/core';
import { TabViewModel } from '../../models/TabsViewModel';

@Component({
    selector: 'tab-bar',
    templateUrl: './tab-bar.component.html'
})
export class TsTabBarComponent {
    @Input() tabModels: TabViewModel[];
   
    constructor(private _hostRef: ElementRef) {

    }
    initTabClickHandler() {
        var self = this;
         jQuery(this._hostRef.nativeElement)
            .find('tab-item')
            .on(['click'], function (e: MouseEvent) {
                self.switchTab(this);
            });
    }

    switchTab(elem: HTMLElement) {
        jQuery(this._hostRef.nativeElement)
            .find('tab-item.active')
            .removeClass('active');
        jQuery(elem).addClass('active');
    }
    ngAfterViewInit() {
        this.initTabClickHandler();
    }
}