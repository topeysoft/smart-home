import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ConfigService } from '../config.service';
import { HttpResponseHandler } from '../../handlers/http-response.handler';
import { DeviceIconMap, DeviceTypeMap, HomieNode } from '../../models/homie-device';
import { MQTTService } from '../mqtt.service';
@Injectable()
export class DeviceManagementService {
    private API_BASE_URL: string = '';
    selectedNode: HomieNode;
    selectedDevice: any;
    constructor(private http: Http, private mqtt:MQTTService, private configSvc: ConfigService) {
        this.API_BASE_URL = this.configSvc.Get('device_management_api_base_url');
    }

    toggleNode(device_id, node: HomieNode) {
        console.log('Node toggle called', node);
        if (!node || !node.capabilities) return;
        node.capabilities.forEach((c) => {
            if (c.action && c.is_settable &&!c.is_range) {
                var topic = c.action.topic;
                if (topic) {
                   topic= topic.replace('{device_base}', this.configSvc.Get('mqtt_config').base_topics.devices);
                   topic= topic.replace('{device_id}', device_id);
                   topic= topic.replace('{node_id}', node.id);
                    this.publishSignal(topic, !c.state);
                }
            }
        })
    }
    adjustNodeRangeValue(device_id, node: HomieNode, property, value) {
        if (!node || !node.capabilities) return;
        var capability=node.capabilities.find((c) => {
            return c.identifier===property;
        });
            if (capability.action && capability.is_settable && capability.is_range) {
                var topic = capability.action.topic;
                if (topic) {
                   topic= topic.replace('{device_base}', this.configSvc.Get('mqtt_config').base_topics.devices);
                   topic= topic.replace('{device_id}', device_id);
                   topic= topic.replace('{node_id}', node.id);
                    if (capability.is_range) {
                      topic=  topic.replace('_{value}',`_${value}`);
                    }
                    this.publishSignal(topic, true);
                }
            }
        
    }

    publishSignal(topic, message){
        this.mqtt.publish(topic, message.toString());
    }
    getRegisteredDevices(): Promise<any> {
        var url = `${this.API_BASE_URL}devices`;
        return this.http.get(url)
            .map(HttpResponseHandler.extractData)
            .catch(HttpResponseHandler.handleError).toPromise();
    }

    getNodeIcon(node) {
        return DeviceIconMap[node.type] || DeviceIconMap['default'];
    }
    getDisplayName(node) {
        return node.name || this.getDisplayType(node);
    }
    getDisplayType(node) {
        return DeviceTypeMap[node.type] || DeviceTypeMap['default'];
    }
    getDescription(node) {
        return node.description || this.getDisplayType(node);
    }
}