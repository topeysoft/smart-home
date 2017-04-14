import { Component } from '@angular/core';
import { TransitionService } from '../../../../services/transition.service';
import { PageBase } from '../../page-base';
import { TsNavigationService, MenuButtonIcons } from '../../../../services/navigation/navigation-service';
import { routerTransition } from '../../../../utilities/router-animations';
import { HomieDevice, HomieNodeCapability, HomieNode } from '../../../../models/homie-device';
import { DeviceOnboardingService } from '../../../../services/onboarding/onboarding.service';
import { OnboardingDeviceWifiSetupComponent } from '../device-wifi-setup/device-wifi-setup.component';
import { OnboardingDeviceSearchComponent } from '../device-search/device-search.component';
import { DeviceManagementService } from '../../../../services/device-management/device-management.services';
@Component({
    selector: 'onboarding-device-capabilities',
    templateUrl: './device-capabilities.component.html'
   
    , host: {
        '[@routerTransition]': ""
    }
    , animations: [routerTransition()]
})
export class OnboardingDeviceCapabilitiesComponent extends PageBase {
    title = 'Device Capabilities';
    homieDeviceInfo:HomieDevice = new HomieDevice();
    constructor(
        private onboardingSvc: DeviceOnboardingService
    , private navigator: TsNavigationService
    , private deviceMgmtSvc:DeviceManagementService) {
        super(navigator);
        if (!this.onboardingSvc.currentDevice) {
            this.navigator.navigate(['/onboarding']);
        } 
    this.navigator.onViewEnter.subscribe(viewCtrl => {
            if (viewCtrl.component.name === 'OnboardingDeviceCapabilitiesComponent') {
                this.setupMenu();
                this.navigator.currentPage.title = this.title;
            }
        });
    }
    setupMenu() {
        this.navigator.currentPage.menuButtonAction = this.navigator.defaultMenuActions.back;
        this.navigator.currentPage.menuButtonAction.action = ()=>{this.navigator.goToPage(OnboardingDeviceSearchComponent);}
    }
    getIcon(node){
        return this.deviceMgmtSvc.getNodeIcon(node);
    }
    continueButtonClick(){
        this.navigator.goToPage(OnboardingDeviceWifiSetupComponent);
    }
    ngOnInit() {
        this.onboardingSvc.getHomieDeviceInfo().then(data=>{
            this.homieDeviceInfo = data||{};
            this.onboardingSvc.currentDevice = this.homieDeviceInfo;
        })
    }
}