import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ConfigService } from '../config.service';
import { HttpResponseHandler } from '../../handlers/http-response.handler';
import { DeviceIconMap, DeviceTypeMap, HomieNode } from '../../models/homie-device';
@Injectable()
export class DeviceManagementService{
    private API_BASE_URL:string ='';
    selectedNode:HomieNode;
    constructor(private http:Http, private configSvc:ConfigService) {
      this.API_BASE_URL = this.configSvc.Get('device_management_api_base_url');
    }
    getRegisteredDevices(): Promise<any> {
        var url=`${this.API_BASE_URL}devices`;
        return this.http.get(url)
            .map(HttpResponseHandler.extractData)
            .catch(HttpResponseHandler.handleError).toPromise();
    }

    getNodeIcon(node) {
        return DeviceIconMap[node.type] || DeviceIconMap['default'];
    }
    getDisplayName(node) {
        return node.name||this.getDisplayType(node);
    }
    getDisplayType(node) {
        return DeviceTypeMap[node.type] || DeviceTypeMap['default'];
    }
    getDescription(node) {
        return node.description||this.getDisplayType(node);
    }
}