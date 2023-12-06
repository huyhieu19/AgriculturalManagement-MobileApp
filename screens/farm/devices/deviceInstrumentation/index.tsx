// import { View, Text, SafeAreaView, Pressable, Alert } from 'react-native'
// import React, { useState } from 'react'
// import { AppColors, AppStyles } from '../../../../global';
// import { RouteProp, useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
// import { IZoneParams } from '../../../../types/zone.type';
// import { AntDesign } from "@expo/vector-icons";
// import { ListZoneItem } from '../../farmDetails/farmDetailsItem';
// import { IDeviceOnZone } from '../../../../types/device.type';
// import { getInstrumentationOnZone } from '../../../../network/apis';
// import Paho from "paho-mqtt";

// import AsyncStorage from '@react-native-async-storage/async-storage';

// type ParamList = {
//     ZoneList: IZoneParams;
// };

// client = new Paho.Client(
//   "broker.hivemq.com",
//   Number(8000),
//   `mqtt-async-test-${parseInt(Math.random() * 100)}`
// );

// const DeviceInstrumentationScreen = () => {
//     const route = useRoute<RouteProp<ParamList, "ZoneList">>();
//     const zone = route?.params ?? [];
//     const isFocused = useIsFocused();
//     const navigation = useNavigation<any>();
//     const [devices, setDevices] = useState<IDeviceOnZone[]>([])
//     const [receivedMessage, setReceivedMessage] = useState<string>("0");

//     const [message, setMessage] = useState<string[]>([]);
//     const [messageToSend, setMessageToSend] = useState<string>('');
//     const [isConnected, setIsConnected] = useState<boolean>(false);
//     const [error, setError] = useState<string>('');

//     const onMessageArrived = (entry: Message) => {
//             console.log("onMessageArrived:" + entry.payloadString);
//             setMessage([...message, entry.payloadString]);
//     };

//     const onConnect = (Client: C) => {
//         console.log("Connected!!!!");
//         Client.subscribe('hello/world');
//         setIsConnected(true);
//         setError('');
//     };

//     const onConnectionLost = (responseObject: any) => {
//         if (responseObject.errorCode !== 0) {
//         console.log("onConnectionLost:" + responseObject.errorMessage);
//         setError('Lost Connection');
//         setIsConnected(false);
//         }
//     };    

//     const getDevicesInstrumentation = React.useCallback(async () => {
//     try {
//         const res = await getInstrumentationOnZone(zone?.id!);
//         setDevices(res.data.Data);
//         console.log("Data device" + res.data.Data)
//     } catch (e) {
//         Alert.alert("Lỗi", `Lỗi lấy dữ liệu nông trại`, [
//             { text: "OK" },
//         ]);
//         navigation.navigate("HomeScreen");
//         console.log("Error on farm screen" + e);
//     } finally {
//         //setIsLoading(false);
//     }
//     }, []);

//     React.useEffect(() => {
//     const client = new Client('yourURL', 1883, 'someClientID');
//     client.onMessageArrived = onMessageArrived;
//     client.onConnectionLost = onConnectionLost;

//     client.connect({
//       onSuccess: onConnect,
//       useSSL: false,
//       userName: 'yourUser',
//       password: 'yourPass',
//       onFailure: (e: any) => { console.log("here is the error", e); }
//     });

//     return () => {
//       client.disconnect();
//     };
//   }, []);
    
//     React.useEffect(() => {
//         if (isFocused) {
//             getDevicesInstrumentation().then(() => { });
//         }
//     }, [isFocused]);

//     return (
//         <SafeAreaView style={AppStyles.appContainer}>
//             <View
//                 style={{
//                     display: "flex",
//                     flexDirection: "row",
//                     alignItems: "center",
//                     paddingHorizontal: 20,
//                     backgroundColor: AppColors.primaryColor,
//                     paddingVertical: 12,
//                     justifyContent: "center",
//                 }}
//             >
//                 <Pressable
//                     style={{
//                         position: "absolute",
//                         left: 20,
//                     }}
//                     onPress={() => {
//                         navigation.navigate("FarmDetailsScreen");
//                     }}
//                 >
//                     <AntDesign name="left" size={24} color="white" />
//                 </Pressable>
//                 <Text style={{ fontSize: 18, color: "white", fontWeight: "500" }}>
//                     Thiết bị đo
//                 </Text>
//             </View>
//             <View>
//                 <ListZoneItem zone={zone} isBorderRadius isBgPrimary />
//             </View>
//         <View>
//         <Text>Received Message: {receivedMessage}</Text>
//         </View>
//         </SafeAreaView>
//     )
// }

// export default DeviceInstrumentationScreen