import { Injectable,EventEmitter,Output } from '@angular/core';
import { ConfigManger } from '../configs/config.manager';

export class ConfigObject{
    key:string;
    value:any;
}

@Injectable()
export class ConfigService {
     config:ConfigObject[] =ConfigManger.getConfig();
   Get (configKey:string):any {
       var data:ConfigObject = this.config.find(a=>a.key.toLowerCase()==configKey.toLowerCase())||new ConfigObject();
        return data.value;
    }
}
