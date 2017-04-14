import { Component, Input, ElementRef } from '@angular/core';
import { DeviceManagementService } from '../../../services/device-management/device-management.services';
import { ResponsiveService } from '../../../services/responsive/responsive.service';
@Component({
    selector: 'rgb-led-control',
    templateUrl: './rgb-led-control-widget.component.html'
})
export class RgbLedControlWidgetComponent {
    @Input() nodeData: any = {};
    pwmValueRange: any = { min: 0, max: 1023 };
    colorValueRange: any = { min: 0, max: 255 };
    rgbModel: any = { red: 100, green: 48, blue: 200, toggles: { red: true, green: true, blue: true } };
    colorPreview;
    constructor(private _hostRef: ElementRef, private deviceMgmtSvc: DeviceManagementService, private respSvc: ResponsiveService) {
        this.generatePreview();
    }

    colorChangeHandler(property, value) {
        this.generatePreview();
        this.deviceMgmtSvc.adjustNodeRangeValue(this.deviceMgmtSvc.selectedDevice.device_id, this.nodeData.node, property, value);
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
            var red = this.toPwmBit(rgb[0]);
            var green = this.toPwmBit(rgb[1]);
            var blue = this.toPwmBit(rgb[2]);
            if (red !== this.rgbModel.red) {
                this.colorChangeHandler('r', red);
                this.rgbModel.red = red;
            }
            if (green !== this.rgbModel.green) {
                this.colorChangeHandler('g', green);
                this.rgbModel.green = green;
            }
            if (blue !== this.rgbModel.blue) {
                this.colorChangeHandler('b', blue);
                this.rgbModel.blue = blue;
            }
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
        console.log('NODE DATA', this.nodeData);
        this.generatePreview();
    }
}