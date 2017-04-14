import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { TsResponsive } from 'ts-common-uitlities';
@Injectable()
export class ResponsiveService {
    /**
     *
     */
    constructor(private plt: Platform) {
        this.onOrientationChange('');
        window.addEventListener('resize', (e) => {
        });
        this.data = TsResponsive.data;
      window.addEventListener('resize', (e) => {
        //  window.addEventListener('ts:responsive:change',(data)=>{
        this.data = TsResponsive.data;
            this.onOrientationChange(e);
            console.log('resize called');
        
      })

    }

    data: any = { xs: true };
    isXsLandscape: boolean;
    isLandscape: boolean;
    isPortrait: boolean;
    isXsPortrait: boolean;

    referesh(){
       var event= new Event('resize');
       this.data={ xs: true };
      setTimeout(function() {
          window.dispatchEvent(event);
      }, 500); 
    }
    private onOrientationChange(e) {
        this.isXsLandscape=this.data.xs && this.data.sm && !this.data.md;
        this.isXsPortrait=this.data.xs && !this.data.sm;
            this.isLandscape = this.plt.isLandscape();
            this.isPortrait = this.plt.isPortrait();
    }
}