import { Http , Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HomieDeviceConfig } from '../../models/homie-device-config';
import { ConfigService } from '../config.service';
import { HttpResponseHandler } from '../../handlers/http-response.handler';
@Injectable()
export class HomieDeviceApiService {
    // private readonly API_BASE_URL = 'http://homie.config/';
    private readonly API_BASE_URL:string = '';
    /**
     *
     */
    constructor(private http: Http, private configSvc:ConfigService) {
        this.API_BASE_URL=this.configSvc.Get('homie_device_setup_base_url');
    }
    heart(): Promise<any> {
        return this.http.get(`${this.API_BASE_URL}heart`)
            .map(HttpResponseHandler.extractData)
            .catch(HttpResponseHandler.handleError).toPromise();
    }
    getDeviceInfo(): Promise<any> {
        return this.http.get(`${this.API_BASE_URL}device-info`)
            .map(HttpResponseHandler.extractData)
            .catch(HttpResponseHandler.handleError).toPromise();
    }
    getDeviceNetworkList(): Promise<any> {
        return this.http.get(`${this.API_BASE_URL}networks`)
            .map(HttpResponseHandler.extractData)
            .catch(HttpResponseHandler.handleError).toPromise();
    }
    putDeviceConfig(configData:HomieDeviceConfig): Promise<any> {
        console.log('CONFIG', configData);
        return this.http.put(`${this.API_BASE_URL}config`, '')
            .map(HttpResponseHandler.extractData)
            .catch(HttpResponseHandler.handleError).toPromise();
    }
}