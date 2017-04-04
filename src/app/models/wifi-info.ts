import { dbmToQuality } from '../utilities/rssi-quality-converter';
export class WifiInfo{
    SSID:string;
    BSSID:string;
    level:number;
    frequency:number;
    strength:number;
    capabilities:string;
}
export class HomieDeviceWifiInfo{
    ssid:string;
    rssi:number;
    encryption:string;

    //display = `${ssid} (${dbmToQuality(this.rssi)})`;
    getQuality():number{
       return dbmToQuality(this.rssi);
    }
}

// {
//   "networks": [
//     { "ssid": "Network_2", "rssi": -82, "encryption": "wep" },
//     { "ssid": "Network_1", "rssi": -57, "encryption": "wpa" },
//     { "ssid": "Network_3", "rssi": -65, "encryption": "wpa2" },
//     { "ssid": "Network_5", "rssi": -94, "encryption": "none" },
//     { "ssid": "Network_4", "rssi": -89, "encryption": "auto" }
//   ]
// }