import { Component, ElementRef, Output, EventEmitter, Input } from '@angular/core';
import 'rasterizehtml/dist/rasterizehtml.js';
var rasterizeHTML = require('rasterizehtml/dist/rasterizehtml.js');
//import * as rasterizeHTML from 'rasterizehtml/dist/rasterizedhtml.js';
//declare var rasterizeHTML;

@Component({
    selector: 'color-wheel',
    templateUrl: './color-wheel.component.html'
})
export class ColorWheelComponent {
    _wrapper: HTMLDivElement;
    _host: HTMLElement;
    _wheel: HTMLCanvasElement;
    _colorWheel: HTMLElement;
    wheelDimen = { width: 200, height: 200 }

    @Input() selectedColor;
    @Output() selectedColorChange = new EventEmitter<any>();
    previewColor;
    hoverColor;
    constructor(private _hostRef: ElementRef) {
        this._host = _hostRef.nativeElement;
    }

    drawWheel() {
        for (var i = 0; i < 360; i++) {
            var color: any = document.createElement("span");
            color.setAttribute("id", "d" + i)
            color.setAttribute("class", "color-item");
            color.style.backgroundColor = "hsl(" + i + ", 100%, 50%)"
            color.style.msTransform = "rotate(" + i + "deg)"
            color.style.webkitTransform = "rotate(" + i + "deg)"
            color.style.MozTransform = "rotate(" + i + "deg)"
            color.style.OTransform = "rotate(" + i + "deg)"
            color.style.transform = "rotate(" + i + "deg)"
            var moveHandler = (e) => {
                this.previewColor = e.srcElement.style.backgroundColor;
            };
            var leaveHandler = (e) => {
                this.previewColor = "rgba(255,255,255,0.0)";
            };
            color.addEventListener('mouseenter', moveHandler);
            //color.addEventListener('mousemove', moveHandler);
            color.addEventListener('mouseleave', leaveHandler);

            color.addEventListener('touchenter', moveHandler);
            color.addEventListener('touchmove', moveHandler);
            color.addEventListener('touchleave', leaveHandler);

            color.addEventListener('click', (e) => {
                this.selectedColor = e.target.style.backgroundColor;
                this.selectedColorChange.emit(this.selectedColor);

            })
            this._colorWheel.appendChild(color)
        };
        this.previewColor  = this.selectedColor;
       // this.drawOnCanvas();
    }
    drawOnCanvas() {
        rasterizeHTML.drawHTML(this._wrapper.innerHTML, this._wheel);
        // var data = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">
        //                 <foreignObject width="100%" height="100%">
        //                 ${this._wrapper.innerHTML}
        //                 </foreignObject>
        //             </svg>`;
        // var DOMURL: any = window.URL || window;

        // var img = new Image();
        // var svg = new Blob([data], { type: 'image/svg+xml' });
        // var url = DOMURL.createObjectURL(svg);

        // img.onload = () => {
        //     console.log(data)
        //     this._wheel.getContext('2d').drawImage(img, 0, 0);
        //     DOMURL.revokeObjectURL(url);
        // }

        // img.src = url;
    }
    ngOnInit() {
        this._colorWheel = this._host.querySelector('#color-wheel') as HTMLElement;
        this._wheel = this._host.querySelector('canvas') as HTMLCanvasElement;
        this._wrapper = this._host.querySelector('#wrapper') as HTMLDivElement;
        this.drawWheel();
    }


}