import { Component } from '@angular/core';
import { PageBase } from '../../page-base';
import { DeviceOnboardingService } from '../../../../services/onboarding/onboarding.service';
import { TsNavigationService } from '../../../../services/navigation/navigation-service';
import { routerTransition } from '../../../../utilities/router-animations';
import { ViewController } from "ionic-angular";
import { OnboardingDeviceSaveConfigComponent } from '../device-save-config/device-save-config.component';
@Component({
    selector: 'onboarding-device-name-setup'
    , templateUrl: './device-name.component.html'
   
    , host: {
        '[@routerTransition]': ""
    }
    , animations: [routerTransition()]
})
export class OnboardingDeviceNameSetupComponent extends PageBase {

    title: string = 'Device Name Setup';
    isDirty: boolean =false;
    animateInvalid: boolean =false;
    groupList:any[]=[];
    deviceInfo:{name:string, selectedGroup:{name:string, description:string}}
    ={name:'',selectedGroup:{name:'', description:''}};
    createGroup:boolean;
    constructor(private onboardingSvc: DeviceOnboardingService, private viewCtrl:ViewController, private navigator: TsNavigationService) {
        super(navigator);
        if (!this.onboardingSvc.currentDevice) {
            this.navigator.navigate(['/onboarding']);
        }
        this.navigator.onViewEnter.subscribe(viewCtrl => {
            if (viewCtrl.component.name === 'OnboardingDeviceWifiSetupComponent') {
                this.setupMenu();
                this.navigator.currentPage.title = this.title;
            }
        });
    }
    setupMenu() {
        this.navigator.currentPage.menuButtonAction = this.navigator.defaultMenuActions.back;
    }
    ngOnInit() {
        this.navigator.currentPage.menuButtonAction = this.navigator.defaultMenuActions.back;
    }
    continueButtonClick() {
         this.isDirty = true;
        if (this.deviceInfo && this.deviceInfo.name 
        && this.deviceInfo.name.length > 0) {
            this.onboardingSvc.homieDeviceConfig.name = this.deviceInfo.name;
            this.navigator.goToPage(OnboardingDeviceSaveConfigComponent);
        }
       this.animateInvalid=true;
       setTimeout(()=> {
           this.animateInvalid=false;
       }, 1000);
        // this.navigator.navigate(['/onboarding/devices/', this.onboardingSvc.currentDevice.id, 'save-config']);
    }
}