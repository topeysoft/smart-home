import { Component, trigger, state, style, transition, animate } from '@angular/core';
import { PageBase } from '../page-base';
import { TsNavigationService } from '../../../services/navigation-service/navigation-service';
import { routerTransition } from '../../../utilities/router-animations';
import { HomieNodeCapability, HomieDevice } from '../../../models/homie-device';
import { DeviceOnboardingService } from '../../../services/onboarding/onboarding.service';
import { DeviceManagementService } from '../../../services/device-management/device-management.services';
import { DeviceNodeDetailComponent } from '../device-detail-page/device-node-detail-page.component';
@Component({
    selector: 'home-page',
    templateUrl: './home-page.component.html',
   
    host: {
        '[@routerTransition]': ""
    }
    , animations: [routerTransition()]
})
export class HomePageComponent extends PageBase {
        devices: any[]=[];

    title: string = 'Smart Home App';
    showHeaderBorder: boolean = false;
    constructor(private navigator: TsNavigationService
    , private onboardingSvc:DeviceOnboardingService
    , private deviceMgmtSvc:DeviceManagementService) {
        super(navigator);
        this.getDevices();
    this.navigator.onViewEnter.subscribe(viewCtrl => {
            if (viewCtrl.component.name === 'HomePageComponent') {
                this.setupMenu();
                this.navigator.currentPage.title = this.title;
            }
        });
    }
    getDevices(){
        this.deviceMgmtSvc.getRegisteredDevices()
        .then(devices=>{
            this.devices=devices;
        }).catch(error=>{
            //TODO: Handle error
            console.log('Get Devices Error', error);
        })
    }
    setupMenu() {
        this.navigator.currentPage.menuButtonAction = this.navigator.defaultMenuActions.menu;
    }

    toggleNode(node){
        console.log('Node toggled');
    }
    showNodeDetail(node){
        this.deviceMgmtSvc.selectedNode=node;
        this.navigator.goToPage(DeviceNodeDetailComponent);
    }

}