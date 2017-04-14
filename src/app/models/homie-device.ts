export class HomieDevice {
    name: string;
    hardware_device_id: string;
    homie_esp8266_version: string;
    firmware:{name:string, verion:string};
    settings: Array<{
      name: string,
      description: string,
      type: any,
      required: boolean,
      default: any
    }>;
    strength: number;

    nodes: HomieNode[] = [];
}


export class HomieNode {
    id:string
    capabilities: HomieNodeCapability[] = []
    type: string = '';
    // group;
   
}
export class HomieNodeCapability {
    name: string;
    type: string = "read_write"
    identifier:string;
    is_metric:boolean;
    is_range:boolean;
    is_settable:boolean;
    min:number;
    max:number;
    value:number;
    state:any;
    unit:string;
    action:{topic?:string}
}

export const DeviceIconMap = {
    'light': 'ion-ios-lightbulb',
    'bulb': 'ion-ios-lightbulb',
    'light-bulb': 'ion-ios-lightbulb',
    'led-bulb': 'ion-ios-lightbulb',
    'led-light-bulb': 'ion-ios-lightbulb',
    'led-light': 'ion-ios-lightbulb',

    'rgbled': 'ion-ios-color-filter-outline',
    'rgb-led': 'ion-ios-color-filter-outline',
    'rgbw-led': 'ion-ios-color-filter',
    'rgbww-led': 'ion-ios-color-filter',
    'rgb-led-light': 'ion-ios-color-filter-outline',
    'rgbw-led-light': 'ion-ios-color-filter',

    'outlet': 'ion-outlet',
    'wall-outlet': 'ion-outlet',
    'power-outlet': 'ion-outlet',

    'temprature': 'ion-ios-snowy',
    'thermometer': 'ion-ios-snowy',
    'default': 'ion-cube',
    'undefined': 'ion-cube',
    'null': 'ion-cube',
    '': 'ion-cube',
}
export const DeviceTypeMap = {
    'light': 'Light Bulb',
    'bulb': 'Light Bulb',
    'light-bulb': 'Light bulb',
    'led-bulb': 'LED light bulb',
    'led-light': 'LED light',
    'rgbled': 'Multi-color LED light',
    'led-light-bulb': 'LED light bulb',
    'rgb-led-light': 'Multi-color LED light',
    'rgbw-led': 'Multi-color (+ white) LED light',
    'rgbw-led-light': 'Multi-color (+ white) LED light',

    'outlet': 'Power outlet',
    'wall-outlet': 'Power outlet',
    'power-outlet': 'Power outlet',

    'temprature': 'Temprature',
    'thermometer': 'Thermometer',
    'default': 'Generic',
    'undefined': 'Generic',
    'null': 'Generic',
    '': 'Generic',
}