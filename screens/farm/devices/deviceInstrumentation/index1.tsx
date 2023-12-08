// import React, { useEffect, useState } from "react";
// import { View, StyleSheet, Text, Image } from "react-native";
// import MqttService from "./test";


// // interface DataSensorProps {
// //   device: string;
// // }

// // interface DataSensorState {
// //   Tempature: string;
// //   Humudity: string;
// //   Brightness: string;
// //   Moisture: string;
// // }

// const mqttService = new MqttService();
// const client = mqttService.getCLient();

// const DeviceInstrumentationScreen: React.FC = () => {
//   const [state, setState] = useState<any>({
//     Tempature: "",
//     Humudity: "",
//     Brightness: "",
//     Moisture: "",
//   });

//   useEffect(() => {
//     const connectMqtt = () => {
//       client.onConnectionLost = onConnectionLost;
//       client.onMessageArrived = onMessageArrived;
//       if (!client.isConnected()) mqttService.connect(callbackConnect);
//     };

//     const onConnectionLost = () => {
//       console.log("lost connect");
//       connectMqtt();
//     };

//     const onMessageArrived = (message: any) => {
//       // var topic = message.topic.split("/");
//       // if (topic[3] === "temperature") {
//       //   setState((prevState) => ({ ...prevState, Tempature: message.payloadString }));
//       // }
//       // if (topic[3] === "moisture") {
//       //   setState((prevState) => ({ ...prevState, Moisture: message.payloadString }));
//       // }
//       // if (topic[3] === "humidity") {
//       //   setState((prevState) => ({ ...prevState, Humudity: message.payloadString }));
//       // }
//       // if (topic[3] === "brightness") {
//       //   setState((prevState) => ({ ...prevState, Brightness: message.payloadString }));
//       // }
//     };

//     const callbackConnect = () => {
//       console.log("connect Succes");
//       mqttService.subscribeTopic(`ancdsd/thisisdeviceid1/#`);
//       // mqttService.subscribeTopic(`${systemUrl}${device}/#`);
//     };

//     connectMqtt();

//     return () => {};
//   }, []);

//   const renderDataValue = (imageSource: string, label: string, value: string) => {
//     return (
//       <View style={styles.dataValue}>
//         <Text>{label}</Text>
//         <Text style={{ color: "blue" }}>{value}</Text>
//       </View>
//     );
//   };

//   return (
//     <View style={styles.tableDataValue}>
//       <View style={styles.row}>
//         {renderDataValue("temp.jpg", "Temperature", `${state.Tempature}°C`)}
//         {renderDataValue("sun.jpg", "Brightness", `${state.Brightness}%`)}
//       </View>
//       <View style={styles.row}>
//         {renderDataValue("humidity.png", "Humidity", `${state.Humudity}%`)}
//         {renderDataValue("moisture.jpg", "Moisture", `${state.Moisture}°C`)}
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   row: {
//     padding: 3,
//   },
//   dataValue: {
//     width: 140,
//     height: 140,
//     backgroundColor: "#fff",
//     marginBottom: 10,
//     textAlign: "center",
//     alignItems: "center",
//     alignContent: "center",
//     justifyContent: "center",
//     borderRadius: 100,
//     elevation: 5,
//   },
//   tableDataValue: {
//     alignContent: "center",
//     justifyContent: "center",
//     width: "100%",
//     backgroundColor: "#ccc",
//     flexDirection: "row",
//   },
// });

// export default DeviceInstrumentationScreen;
