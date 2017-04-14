import { Component } from '@angular/core';
import { TransitionService } from '../../../../services/transition.service';
import { PageBase } from '../../page-base';
import { TsNavigationService, MenuButtonIcons } from '../../../../services/navigation/navigation-service';
import { routerTransition } from '../../../../utilities/router-animations';
import { HomieDevice, HomieNodeCapability } from '../../../../models/homie-device';
import { DeviceOnboardingService } from '../../../../services/onboarding/onboarding.service';
import { OnboardingDeviceCapabilitiesSearchComponent } from '../device-capabilities-search/device-capabilities-search.component';
import { WifiInfo } from '../../../../models/wifi-info';
import { Network } from "ionic-native/dist/es5";
import { OnboardingDeviceCapabilitiesComponent } from '../device-capabilities/device-capabilities.component';
@Component({
    selector: 'onboarding-search-result',
    templateUrl: './device-search-result.component.html'
    // , host: {
    //     '[@routerTransition]': ""
    // }
    // , animations: [routerTransition()]
})
export class OnboardingSearchResultComponent extends PageBase {

    isLoading: boolean = true;
    title: string = 'New devices';

    newDevices: WifiInfo[] = [];
    constructor(private onboardingSvc: DeviceOnboardingService, private navigator: TsNavigationService) {
        super(navigator);
        // var capability: DeviceCapability[] = [{ name: 'Toggle On/Off', type: 'toggle' }, { name: 'dimmable', type: 'dimmable' }];
        // var capability2: DeviceCapability[] = [{ name: 'thermometer °F/°C', type: 'read' }];
        // var capability3: DeviceCapability[] = [{ name: 'RGBW Control', type: 'rgbw-control' }];
        // var capability4: DeviceCapability[] = [{ name: 'RGB Control', type: 'rgb-control' }];
        // var node: any = { name: 'LED light bulb', capabilities: capability, type: 'light-bulb' };
        // var node2: any = { name: 'Temperature', capabilities: capability2, type: 'thermometer' };
        // var node3: any = { name: 'RGB LED Strip', capabilities: capability2, type: 'rgb-led-light' };
        // var node4: any = { name: 'RGBW LED Strip', capabilities: capability3, type: 'rgbw-led-light' };
        // this.newDevices.push({ name: 'Homie-123eda43', id: '123eda43', strength: 80, nodes: [node, node2] });
        // this.newDevices.push({ name: 'Homie-42353f32', id: '42353f32', strength: 50, nodes: [node3] });
        // this.newDevices.push({ name: 'Homie-ade23222', id: 'ade23222', strength: 30, nodes: [node4, node2] });

        // this.newDevices=this.onboardingSvc.deviceList;
        this.navigator.onViewEnter.subscribe(viewCtrl => {
            if (viewCtrl.component.name === 'OnboardingSearchResultComponent') {
                this.setupMenu();
                this.navigator.currentPage.title = this.title;
            }
        });
    }
    setupMenu() {
        this.navigator.currentPage.menuButtonAction = this.navigator.defaultMenuActions.home;
        this.navigator.currentPage.menuButtonAction.icon = MenuButtonIcons.back;
    }
    deviceClick(device: HomieDevice) {
        this.onboardingSvc.currentDevice = device;
        this.navigator.goToPage(OnboardingDeviceCapabilitiesSearchComponent);
    }
    ngOnInit() {
       // this.navigator.presentPleaseWait();
        // this.onboardingSvc.queryDevices().then(
        //     list => {
        //         this.finishedDeviceQuery(list);
        //     }).catch(
        //     error=>{
                this.finishedDeviceQuery(null);
        //     });
    }

    finishedDeviceQuery(list) {
        var win:any=window;
        if (!list || list.length < 1) {
            this.onboardingSvc.checkHeartBeat().then(
                (sx)=>{
                    this.navigator.goToPage(OnboardingDeviceCapabilitiesComponent);
                }).catch((er)=>{
                    console.log('error checking heartbeat', er)
                });
        }
        this.isLoading = false;
      //  this.navigator.dismissLoading();
    }

}