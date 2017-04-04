import { Injectable, EventEmitter } from '@angular/core';
import * as Mqtt from 'mqtt';
import 'paho-mqtt/mqttws31.js';
import { ConfigService } from './config.service';
declare var Paho: any;
@Injectable()
export class MQTTService {

    onConnected = new EventEmitter<any>();
    onDisconnected = new EventEmitter<any>();
    onPublished = new EventEmitter<any>();
    onSubscribed = new EventEmitter<any>();
    onMessageReceived = new EventEmitter<any>();

    private static MqtSvc:MQTTService;
    private client: Mqtt.Client | any;
    private mqttConfig: any = {};
    constructor(private configSvc: ConfigService) {
        this.mqttConfig = this.configSvc.Get('mqtt_config');
        MQTTService.config=this.mqttConfig;
        MQTTService.MqtSvc=this;
      setTimeout(()=> {this.initialize()}, 1000);
    }

    private initialize() {

        console.debug('MQTT Initializing');
        this.connect();

    }

    private static config;

    private connect() {
        if (!this.client || !this.client.connected) {
            var options: Mqtt.ClientOptions | any = {};
            var clientId = this.mqttConfig.app_client_id || 'mqtt-app';
            var port = this.mqttConfig.ws_port || 8080;
            var host = this.mqttConfig.host;
            var userName = this.mqttConfig.username;
            var password = this.mqttConfig.password;
            var protocol = this.mqttConfig.protocol || 'mqtt';

            var userAt = '';
            if (this.mqttConfig.auth) {
                userAt = userName + '@';
                options.password = password;
            }

            var url = `${protocol}://${userAt}${host}:${port}?clientId=${clientId}`;
            options.clientId = clientId;
            options.protocol = protocol;
            options.keepalive = 200;
            // var client = Mqtt.connect(mqttConfig);
            this.client = new Paho.MQTT.Client(host, Number(port), this.mqttConfig.app_client_id);//Mqtt.connect(url, options);

            this.client.onConnectionLost = this.onConnectionLost;
            this.client.onMessageArrived = this.onMessageArrived;

            // connect the client
            this.client.connect({ onSuccess: this.onConnect });


            // called when the client connects


            // console.log("MQTT Client", client);
            // client.on('connect', (e) => {
            //     console.log('MQTT client connected', e);
            //     var pubTopic =`${mqttConfig.base_topics.apps}${clientId}/$stats/$online`
            //     var appSubTopic =`${mqttConfig.base_topics.apps}#`;
            //     var deviceSubTopic =`${mqttConfig.base_topics.devices}#`;
            //    // this.publish(pubTopic, 'true');
            //     this.subscribe(deviceSubTopic);
            //     this.subscribe(appSubTopic);
            //     this.onConnected.emit(e);
            // });
            // client.on('error', (e)=> {
            //     console.log('MQTT client error occured', e);
            //     // this.onDisconnected.emit(e);
            // });
            // client.on('disconnect', (e)=> {
            //     console.log('MQTT client disconnected', e);
            //     this.onDisconnected.emit(e);
            // });
            // client.on('message', (topic, message) => {
            //     console.log('MQTT client received a message', topic, message.toString());
            //     this.onMessageReceived.emit({ topic: topic, message: message });
            // });

        }
    }
    disconnect(force: boolean = false) {
        this.client.end(force, (e) => {
            this.onDisconnected.emit(e)
        })
    }


    publish(topic: string, message: any, options?: Mqtt.ClientPublishOptions) {
        //var buffer = new Buffer(message);
        var message = new Paho.MQTT.Message(message);
        message.destinationName = topic;
        this.client.send(message);
    }

    subscribe(topic, options?) {
        this.client.subscribe(topic);
    }


    onConnect(e) {
        // Once a connection has been made, make a subscription and send a message.
        var config:any = MQTTService.config;
        console.log('MQTT client connected');
        var pubTopic = `${config.base_topics.apps}${config.app_client_id}/$stats/$online`
        var appSubTopic = `${config.base_topics.apps}#`;
        var deviceSubTopic = `${config.base_topics.devices}#`;
        MQTTService.MqtSvc.subscribe(deviceSubTopic);
        MQTTService.MqtSvc.subscribe(appSubTopic);
        
        MQTTService.MqtSvc.publish(pubTopic, "I'm connected");
        MQTTService.MqtSvc.onConnected.emit(e);
    }

    // called when the client loses its connection
    onConnectionLost(responseObject) {
        if (responseObject.errorCode !== 0) {
            console.log("onConnectionLost:" + responseObject.errorMessage);
        }
    }

    // called when a message arrives
    onMessageArrived( message) {
      //  console.log("onMessageArrived topic:",message.destinationName);
       // console.log("onMessageArrived:" , message.payloadString);
    }
}