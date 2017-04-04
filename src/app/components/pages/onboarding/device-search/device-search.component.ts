import { HostBinding, Component, trigger, state, style, transition, animate } from '@angular/core';
import { TransitionParams, TransitionService } from '../../../../services/transition.service';
import { TsNavigationService, MenuAction } from '../../../../services/navigation-service/navigation-service';
import { PageBase } from '../../page-base';
import { routerTransition } from '../../../../utilities/router-animations';
import { DeviceOnboardingService } from '../../../../services/onboarding/onboarding.service';
import { OnboardingSearchResultComponent } from '../device-search-result/device-search-result.component';
@Component({
    selector: 'onboarding-device-search',
    templateUrl: './device-search.component.html',
    host: {
        '[@routerTransition]': ""
    }
    , animations: [routerTransition()]
})
export class OnboardingDeviceSearchComponent extends PageBase {

    //  title: string = 'Searching Devices';


    showHeaderBorder: boolean = false;
    constructor(private onboardingSvc: DeviceOnboardingService, private navigator: TsNavigationService) {
        super(navigator);
        this.navigator.onViewEnter.subscribe(viewCtrl => {
            if (viewCtrl.component.name === 'OnboardingDeviceSearchComponent') {
                this.navigator.currentPage.menuButtonAction = this.navigator.defaultMenuActions.close;
            }
        });

    }

    ngOnInit() {
        this.onboardingSvc.queryDevices().then(
            list=>{
                this.finishedDeviceQuery();
            }
        );
    }
    ngAfterViewInit() {
        
    }

    finishedDeviceQuery(){
        setTimeout(() => {
            this.navigator.goToPage(OnboardingSearchResultComponent);
        }, 1500);
    }
}