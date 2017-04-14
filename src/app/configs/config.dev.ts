export const devConfig = [
    {
        "key": "mqtt_config",
        value: {
            host: 'topeysoft.smart.local'
            // host: '192.168.1.119'
            , port: 1883
            , ws_port: 8080
            , protocol: 'mqtt'
            , auth: false
            , username: null
            , password: null
            , app_client_id: 'smart-home-app'
            , base_topics: {apps:'apps/', devices:'devices/'}
        }
    },
    {
        key:'homie_device_setup_base_url',
        value:'http://homie.config/'
        //value:'http://192.168.123.1/'
    },
    {
        key:'device_management_api_base_url',
        value:'http://topeysoft.smart.local:8080/api/'
    }
]