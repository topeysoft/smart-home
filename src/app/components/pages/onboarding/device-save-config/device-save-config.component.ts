import { Component } from '@angular/core';
import { PageBase } from '../../page-base';
import { DeviceOnboardingService } from '../../../../services/onboarding/onboarding.service';
import { TsNavigationService } from '../../../../services/navigation/navigation-service';
import { routerTransition } from '../../../../utilities/router-animations';
import { OnboardingDeviceSetupCompleteComponent } from '../device-setup-complete/device-setup-complete.component';
@Component({
    selector: 'onboarding-device-save-config',
    templateUrl: './device-save-config.component.html'
     ,host: {
        '[@routerTransition]': ""
    }
    , animations: [routerTransition()]
})
export class OnboardingDeviceSaveConfigComponent extends PageBase{

title:string = 'Saving configuration';
    constructor(private onboardingSvc: DeviceOnboardingService, private navigator: TsNavigationService) {
        super(navigator);
        if (!this.onboardingSvc.currentDevice) {
            this.navigator.navigate(['/onboarding']);
        }
    }

 ngOnInit() {
        this.navigator.currentPage.menuButtonAction = this.navigator.defaultMenuActions.close;
        this.onboardingSvc.saveHomieConfigChanges()
        .then((sx)=>{
            this.navigator.goToPage(OnboardingDeviceSetupCompleteComponent);
        }).catch((er)=>{
            console.log(er);
            //TODO:: Hanle error. Possibly show feedback 
        });
    }
  ngAfterViewInit() {
        // setTimeout(() => {
        //     this.navigator.navigate(['onboarding/devices', this.onboardingSvc.currentDevice.id, 'complete']);
        // }, 1500);
    }
}