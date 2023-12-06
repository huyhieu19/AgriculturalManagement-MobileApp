// import AsyncStorage from "@react-native-async-storage/async-storage";
// import init from "react_native_mqtt";
// import UUIDGenerator from "react-native-uuid";

// init({
//   size: 10000,
//   storageBackend: AsyncStorage,
//   defaultExpires: 1000 * 3600 * 24,
//   enableCache: true,
//   sync: {},
// });

// const options = {
//   host: "broker.emqx.io",
//   port: 8083,
// };

// class MqttService {
//   private client: Paho.MQTT.Client;

//   constructor() {
//     this.client = new Paho.MQTT.Client(options.host, options.port, UUIDGenerator.v4());
//     this.onConnectionLost = this.onConnectionLost.bind(this);
//     this.onFailure = this.onFailure.bind(this);
//   }

//   connect(callBack: () => void): void {
//     this.client.connect({
//       onSuccess: callBack,
//       useSSL: false,
//       timeout: 3,
//       onFailure: this.onFailure,
//     });
//   }

//   checkConnect(): void {
//     console.log(this.client.isConnected());
//   }

//   private onFailure(err: any): void {
//     console.log("Connect failed!");
//     console.log(err);
//   }

//   private onConnectionLost(responseObject: any): void {
//     while (responseObject.errorCode !== 0) {
//       console.log("onConnectionLost:" + responseObject.errorMessage);
//     }
//   }

//   subscribeTopic(topic: string): void {
//     this.client.subscribe(topic, { qos: 0 });
//   }

//   sendMessage(topic: string, payload: string): void {
//     const message = new Paho.MQTT.Message(payload);
//     message.destinationName = topic;
//     this.client.send(message);
//   }

//   getCLient(): Paho.MQTT.Client {
//     return this.client;
//   }
// }

// export default MqttService;
