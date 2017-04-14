import { HostBinding, Component, trigger, state, style, transition, animate } from '@angular/core';
import { TransitionParams, TransitionService } from '../../../../services/transition.service';
import { TsNavigationService } from '../../../../services/navigation/navigation-service';
import { PageBase } from '../../page-base';
import { routerTransition } from '../../../../utilities/router-animations';
import { DeviceOnboardingService } from '../../../../services/onboarding/onboarding.service';
import { OnboardingDeviceCapabilitiesComponent } from '../device-capabilities/device-capabilities.component';
@Component({
    selector: 'onboarding-device-capabilities-search',
    templateUrl: './device-capabilities-search.component.html',
  
    host: {
        '[@routerTransition]': ""
    }
    , animations: [routerTransition()]
})
export class OnboardingDeviceCapabilitiesSearchComponent extends PageBase {

    //title: string = 'Checking Device Capabilities';
    showHeaderBorder: boolean = false;
    constructor(private onboardingSvc:DeviceOnboardingService, private navigator: TsNavigationService) {
        super(navigator);
        if(!this.onboardingSvc.currentDevice){
            this.navigator.navigate(['/onboarding/devices']);
        }

        this.navigator.onViewEnter.subscribe(viewCtrl => {
            if (viewCtrl.component.name === 'OnboardingDeviceCapabilitiesSearchComponent') {
                this.navigator.currentPage.menuButtonAction = this.navigator.defaultMenuActions.close;
            }
        })
    }

    ngOnInit() {
        this.navigator.currentPage.menuButtonAction = this.navigator.defaultMenuActions.close;
    }
    ngAfterViewInit() {
        setTimeout(() => {
            this.navigator.goToPage(OnboardingDeviceCapabilitiesComponent);
        }, 1500);
    }
}