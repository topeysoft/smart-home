import { Component } from '@angular/core';
import { PageBase } from '../../page-base';
import { DeviceOnboardingService } from '../../../../services/onboarding/onboarding.service';
import { TsNavigationService } from '../../../../services/navigation/navigation-service';
import { routerTransition } from '../../../../utilities/router-animations';
@Component({
    selector: 'onboarding-device-setup-complete',
    templateUrl: './device-setup-complete.component.html'
    //  ,host: {
    //     '[@routerTransition]': ""
    // }
    // , animations: [routerTransition()]
})
export class OnboardingDeviceSetupCompleteComponent extends PageBase{

title:string = 'Setup Completed!';
    constructor(private onboardingSvc: DeviceOnboardingService, private navigator: TsNavigationService) {
        super(navigator);
        // if (!this.onboardingSvc.currentDevice) {
        //     this.navigator.navigate(['/onboarding']);
        // }
    }

 ngOnInit() {
        this.navigator.currentPage.menuButtonAction = this.navigator.defaultMenuActions.home;
    }
   continueButtonClick() {
       // this.navigator.navigate(['/home']);
    }
}