import { Component, Input, ElementRef } from '@angular/core';
import { DeviceManagementService } from '../../../services/device-management/device-management.services';
@Component({
    selector: 'rgb-led-control',
    templateUrl: './rgb-led-control-widget.component.html'
})
export class RgbLedControlWidgetComponent {
    @Input() nodeData = {};
    pwmValueRange: any = { min: 0, max: 1023 };
    colorValueRange: any = { min: 0, max: 255 };
    rgbModel: any = { red: 100, green: 48, blue: 200 };
    colorPreview;
    constructor(private _hostRef: ElementRef, private deviceMgmtSvc: DeviceManagementService) {
        this.generatePreview();
    }

    colorChangeHandler() {
        this.generatePreview();
    }

    toColorBit(pwmBitValue: number) {
        if (pwmBitValue > this.pwmValueRange.max) pwmBitValue = this.pwmValueRange.max;
        if (pwmBitValue < this.pwmValueRange.min) pwmBitValue = this.pwmValueRange.min;
        var actual = Math.ceil((pwmBitValue / this.pwmValueRange.max) * this.colorValueRange.max);
        return actual;
    }
    toPwmBit(colorBitValue: number) {
        if (colorBitValue > this.colorValueRange.max) colorBitValue = this.colorValueRange.max;
        if (colorBitValue < this.colorValueRange.min) colorBitValue = this.colorValueRange.min;
        var actual = Math.ceil((colorBitValue / this.colorValueRange.max) * this.pwmValueRange.max);
        return actual;
    }

    setColorValues(rgbColorString) {
        try {
            this._hostRef.nativeElement.classList.add('animate-slider');
            var rgb = rgbColorString;
            rgb = rgb.replace(/[^\d,]/g, '').split(',');
            this.rgbModel.red = this.toPwmBit(rgb[0]);
            this.rgbModel.green = this.toPwmBit(rgb[1]);
            this.rgbModel.blue = this.toPwmBit(rgb[2]);
            this.generatePreview();
            setTimeout(() => {
                this._hostRef.nativeElement.classList.remove('animate-slider');
            }, 1000);
        } catch (e) { }
    }

    generatePreview() {
        this.colorPreview = `rgb(${this.toColorBit(this.rgbModel.red)},${this.toColorBit(this.rgbModel.green)},${this.toColorBit(this.rgbModel.blue)})`;
    }
    ngOnInit() {
        this.generatePreview();
    }
}