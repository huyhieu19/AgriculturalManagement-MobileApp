import AsyncStorage from "@react-native-async-storage/async-storage";
import init from "react_native_mqtt";

init({
  size: 10000,
  storageBackend: AsyncStorage,
  defaultExpires: 1000 * 3600 * 24,
  enableCache: true,
  sync: {},
});

const options = {
  host: "broker.hivemq.com",
  port: 8000, // Thay đổi cổng thành 1883 cho giao thức TCP
};

class MqttService {
  client = new Paho.MQTT.Client(
    options.host,
    options.port,
    "ddddddddddddddddys"
  );

  constructor() {}

  // connect(callBack) {
  //   this.client.connect({
  //     onSuccess: callBack,
  //     useSSL: false, // Sử dụng giao thức TCP nên không cần SSL
  //     timeout: 3,
  //     onFailure: this.onFailure,
  //   });
  // }
  connect = (onSuccessCallback) => {
    if (!this.isConnected) {
      this.client.connect({
        onSuccess: () => {
          this.isConnected = true;
          if (onSuccessCallback) {
            onSuccessCallback();
          }
        },
        useSSL: false,
        timeout: 3,
        onFailure: this.onFailure,
      });
    } else {
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    }
  };

  disconnect = () => {
    if (this.isConnected) {
      this.client.disconnect();
      this.isConnected = false;
    }
  };

  checkConnect = () => {
    console.log(this.client.isConnected());
  };

  onFailure = (err) => {
    console.error("MQTT Connection failed:", err);
  };

  onMessageArrived = (callback) => {
    this.client.onMessageArrived = (message) => {
      callback(message.payloadString);
    };
  };

  onConnectionLost = (responseObject) => {
    while (responseObject.errorCode !== 0) {
      console.log("onConnectionLost:" + responseObject.errorMessage);
    }
  };

  subscribeTopic = (topic) => {
    this.client.subscribe(topic, { qos: 0 });
  };

  sendMessage = (topic, payload) => {
    let message = new Paho.MQTT.Message(payload);
    message.destinationName = topic;
    this.client.send(message);
  };

  getCLient() {
    return this.client;
  }
}

export default MqttService;
