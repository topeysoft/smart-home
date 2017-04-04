import { Injectable } from '@angular/core';
import { HomieDevice } from '../../models/homie-device';
import { Platform } from 'ionic-angular';
import { WifiInfo } from '../../models/wifi-info';
import { HomieDeviceApiService } from '../device-api/homie-device-api.service';
import { HomieDeviceConfig } from '../../models/homie-device-config';
import { TsNavigationService } from '../navigation-service/navigation-service';
import { ConfigService } from '../config.service';
@Injectable()
export class DeviceOnboardingService {
    /**
     *
     */

    mockedWifiWizard = {
        getScanResults: (sx, er) => {
            setTimeout(() => {
                sx([]);
            }, 2000);
        },
        startScan: (sx, er) => {
            setTimeout(() => {
                sx('OK');
            }, 2000);
        }
    }

    isListeningForDevice: boolean = false;
    homieDeviceConfig: HomieDeviceConfig = new HomieDeviceConfig();

    constructor(platform: Platform
    , private navigator: TsNavigationService
    , private homieApi: HomieDeviceApiService
    , private configSvc:ConfigService) {
        platform.ready().then(() => {
            if (typeof WifiWizard !== 'undefined') {
            }
            else {
            }
        });

        this.navigator.onViewEnter.subscribe(viewCtrl => {
            if (viewCtrl.component.name === 'OnboardingSearchResultComponent') {
                this.isListeningForDevice = true;
            } else {
                this.isListeningForDevice = false;
            }
        })
    }

    deviceList: Array<WifiInfo> = [];
    currentDevice: HomieDevice;
    


    saveHomieConfigChanges():Promise<any>{
        var mqtt=this.configSvc.Get('mqtt_config');
        this.homieDeviceConfig.mqtt.auth=mqtt.auth;
        this.homieDeviceConfig.mqtt.host=mqtt.host;
        this.homieDeviceConfig.mqtt.port=mqtt.port;
        this.homieDeviceConfig.mqtt.username=mqtt.username;
        this.homieDeviceConfig.mqtt.password=mqtt.password;
        this.homieDeviceConfig.mqtt.base_topic=mqtt.base_topics.devices;
      return  this.homieApi.putDeviceConfig(this.homieDeviceConfig);
    }
    queryDevices(): Promise<any> {
        var promise = new Promise<any>((resolve, reject) => {
            let wiz = this.mockedWifiWizard;
            if (typeof WifiWizard !== 'undefined') {
                wiz = WifiWizard;
            }
            wiz.startScan((data) => {
                wiz.getScanResults((result) => {
                    resolve(result);
                    // this.observable.emit(result);
                }, (error) => {
                    reject(error);
                });
            }, (er) => { reject(er); }
            );
        })
        return promise;
    }

    checkHeartBeat(): Promise<any> {
        var promise = new Promise<string>((resolve, reject) => {
            var tryGetHeartBeat = () => {
                setTimeout(() => {
                    if (this.isListeningForDevice) {
                        this.homieApi.heart().then(
                            (data) => {
                                resolve(data);
                            }
                        ).catch(
                            () => {

                                tryGetHeartBeat();
                                var e = 'Failed! Retrying';
                               // reject(e)
                            }
                            )
                    }
                }, 2000)
            };
            tryGetHeartBeat();
        });

        return promise;
    }
    getHomieDeviceNetworks(): Promise<any> {
        return this.homieApi.getDeviceNetworkList();
    }
    getHomieDeviceInfo(): Promise<any> {
        return this.homieApi.getDeviceInfo();
    }

}