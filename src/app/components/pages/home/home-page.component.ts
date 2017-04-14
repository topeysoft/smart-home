import { Component, trigger, state, style, transition, animate } from '@angular/core';
import { PageBase } from '../page-base';
import { TsNavigationService } from '../../../services/navigation/navigation-service';
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
        showDetail=false;
    devices: any[] = [];

    title: string = 'Smart Home App';
    constructor(private navigator: TsNavigationService
        , private onboardingSvc: DeviceOnboardingService
        , private deviceMgmtSvc: DeviceManagementService) {
        super(navigator);
        this.getDevices();
        this.navigator.onViewEnter.subscribe(viewCtrl => {
            if (viewCtrl.component.name === 'HomePageComponent') {
                this.setupMenu();
                this.navigator.currentPage.title = this.title;
                this.navigator.showHeaderBorder=false;
            }
        });
    }
    getDevices() {
        var demoDevices= [{"_id":"58d824a82509ca558ed1b8f0","device_id":"test-device-1","online":"false"
        ,"lastModified":"2017-04-08T02:57:09.859Z","nodes":[{"capabilities":[],"type":"rgb-led","id":"rgb-led"
        ,"name":"Theater Room RGB LED","description":"Theater Room multi-color RGB LED strip for mood lighting."}]}
        ,{"_id":"58dd558d2509ca558ed1b8f2","device_id":"5ccf7f8035f9","online":"false","lastModified":"2017-04-06T23:50:30.123Z"
        ,"nodes":[{"capabilities":[{"identifier":"r","is_range":true,"is_settable":true,"min":1,"max":1023,
        "action":{"topic":"{device_base}{device_id}/{node_id}/r_{value}/set"}},{"identifier":"g","is_range":true
        ,"is_settable":true,"min":1,"max":1023,"action":{"topic":"{device_base}{device_id}/{node_id}/g_{value}/set"}}
        ,{"identifier":"b","is_range":true,"is_settable":true,"min":1,"max":1023,"action":{"topic":"{device_base}{device_id}/{node_id}/b_{value}/set"}}
        ,{"identifier":"r-on","is_range":false,"is_settable":true,"action":{"topic":"{device_base}{device_id}/{node_id}/r-on/set"}},{"identifier":"g-on","is_range":false
        ,"is_settable":true,"action":{"topic":"{device_base}{device_id}/{node_id}/g-on/set"}},{"identifier":"b-on","is_range":false
        ,"is_settable":true,"action":{"topic":"{device_base}{device_id}/{node_id}/b-on/set"}}],"type":"rgbled","id":"rgb-led"}]}
        ,{"_id":"58ddc1a24d7d2d21e6803204","device_id":"tsc-iot-002","interval":"60","signal":"76","uptime":"246","online":"false"
        ,"localip":"192.168.1.143","lastModified":"2017-03-31T02:40:34.153Z"},{"_id":"58e18ba04d7d2d21e6803205","device_id":"light-bulb-test"
        ,"name":"Light Bulb","lastModified":"2017-04-02T23:45:05.879Z","nodes":[{"capabilities":[],"type":"led-light","id":"led-light-bulb"
        ,"name":"Light Bulb Left"}]},{"_id":"58e84262dd8d7a7072c6d33b","device_id":"outlet-device","online":"true","lastModified":"2017-04-08T02:54:57.086Z"
        ,"nodes":[{"id":"wall-outlet-1","type":"wall-outlet"},{"id":"test-device-1","type":"rgbw-led"}]}];
        this.deviceMgmtSvc.getRegisteredDevices()
            .then(devices => {
                this.devices = devices;
                // for demo only remove before publish
                if (!this.devices || this.devices.length < 1) {
                    this.devices = demoDevices;
                }
            }).catch(error => {
                //TODO: Handle error
                console.log('Get Devices Error', error);
                this.devices= demoDevices;
            })
    }
    setupMenu() {
        this.navigator.currentPage.menuButtonAction = this.navigator.defaultMenuActions.menu;
    }

    toggleNode(device, node) {
        this.deviceMgmtSvc.toggleNode(device.device_id, node);
    }
    showNodeDetail(device, node) {
        this.deviceMgmtSvc.selectedNode = node;
        this.deviceMgmtSvc.selectedDevice = device;
        this.devices.forEach((d)=>{
            if(d.nodes && d.nodes.length>0){
                d.nodes.forEach((n)=>{
                    n.active=false;
                })
            }
        })
        node.active=true;
        this.showDetail=false;
        setTimeout(() =>{
            this.showDetail=true;;
        }, 500);
      //  this.navigator.goToPage(DeviceNodeDetailComponent);
    }

}