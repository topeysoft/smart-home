import { Component } from '@angular/core';
import { PageBase } from '../../page-base';
import { DeviceOnboardingService } from '../../../../services/onboarding/onboarding.service';
import { TsNavigationService } from '../../../../services/navigation/navigation-service';
import { routerTransition } from '../../../../utilities/router-animations';
import { OnboardingDeviceNameSetupComponent } from '../device-name/device-name.component';
@Component({
    selector: 'onboarding-device-wifi-setup',
    templateUrl: './device-wifi-setup.component.html'

    , host: {
        '[@routerTransition]': ""
    }
    , animations: [routerTransition()]
}) export class OnboardingDeviceWifiSetupComponent extends PageBase {
    title: string = 'WiFi Setup';
    showPassword: boolean = false;
    passwordType: string = 'password';
    passwordIcon: string = 'ion-ios-locked';
    wifiList: any[] = [];
    wifiSsid: string = '';
    isDirty: boolean = false;
    wifiPassword: string = '';
    invalidSsid:boolean= false;
    animateInvalid:boolean=false;
    constructor(private onboardingSvc: DeviceOnboardingService, private navigator: TsNavigationService) {
        super(navigator);
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
    toggleShowPassword(show) {
        this.showPassword = show;
        if (this.showPassword) {
            this.passwordType = 'text';
            this.passwordIcon = 'ion-ios-unlocked-outline';
        } else {
            this.passwordType = 'password';
            this.passwordIcon = 'ion-ios-locked';
        }
    }

    wifiSelected(item) {
        this.wifiSsid = item.ssid;
        this.inputChanged();
    }
    inputChanged() {
        this.isDirty = false;
    }
    continueButtonClick() {
        this.isDirty = true;
        if (this.wifiSsid && this.wifiSsid.length > 0) {
            this.onboardingSvc.homieDeviceConfig.wifi = { ssid: this.wifiSsid, password: this.wifiPassword };
            this.navigator.goToPage(OnboardingDeviceNameSetupComponent);
        }
       this.animateInvalid=true;
       setTimeout(()=> {
           this.animateInvalid=false;
       }, 1000);
        // this.navigator.navigate(['/onboarding/devices/', this.onboardingSvc.currentDevice.id, 'name-setup']);
    }
    ngOnInit() {
        if (!this.onboardingSvc.currentDevice) {
            this.navigator.navigate(['/onboarding']);
        } else {
            this.onboardingSvc.getHomieDeviceNetworks()
                .then(data => {
                    this.wifiList = data.networks;
                })
        }
    }

    ngDoCheck(){
       this.invalidSsid= this.isDirty&&(!this.wifiSsid||this.wifiSsid.length<1);
    }
}