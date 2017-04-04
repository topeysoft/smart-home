import { devConfig } from './config.dev';
import { prodConfig } from './config.prod';
import { environment } from '../../environments/environment';

export module ConfigManger{
   export function getConfig():any{
        if(environment.production){
            warnUserOfConsolePredicament();
            return prodConfig;
        }else{
            return devConfig;
        }
    }
   
   function warnUserOfConsolePredicament(){
       console.error("PLEASE STOP! \n You have no reason to use this feature.");
   }
}