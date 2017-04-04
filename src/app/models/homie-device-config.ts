
export class HomieDeviceConfig {
  name: string = '';
  device_id: string;
  wifi: {
    ssid: string,
    password: string,
  };
  mqtt: {
    host: string,
    port: number,
    base_topic: string,
    auth: boolean,
    username: string,
    password: string
  } = {
    host: '192.168.1.119',
    port: 1883,
    base_topic: "devices/",
    auth: false,
    username: "user",
    password: "pass"
  };
  ota: {
    enabled: boolean
  } = { enabled: true };
  settings: {
    percentage: number
  } = { percentage: 55 }
}