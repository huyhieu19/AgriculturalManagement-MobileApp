import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  Alert,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
} from "react-native";
import React, { useState } from "react";
import { AppColors, AppStyles } from "../../../../global";
import {
  RouteProp,
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { IZoneParams } from "../../../../types/zone.type";
import { AntDesign } from "@expo/vector-icons";
import { ListZoneItem } from "../../farmDetails/farmDetailsItem";
import { IDeviceOnZone } from "../../../../types/device.type";
import { getInstrumentationOnZone } from "../../../../network/apis";
import DevicesOnModulesItem from "../../../module/modules_main/module_devices_item/device_item";

type ParamList = {
  ZoneList: IZoneParams;
};
const DeviceInstrumentationScreen = () => {
  const route = useRoute<RouteProp<ParamList, "ZoneList">>();
  const zone = route?.params ?? [];
  const isFocused = useIsFocused();
  const navigation = useNavigation<any>();
  const [devices, setDevices] = useState<IDeviceOnZone[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [zoneState, SetZoneState] = useState<IZoneParams>(zone);

  // const [receivedMessage, setReceivedMessage] = useState<string>("0");

  // const [message, setMessage] = useState<string[]>([]);
  // const [messageToSend, setMessageToSend] = useState<string>('');
  // const [isConnected, setIsConnected] = useState<boolean>(false);
  // const [error, setError] = useState<string>('');

  // const onMessageArrived = (entry: Message) => {
  //     console.log("onMessageArrived:" + entry.payloadString);
  //     setMessage([...message, entry.payloadString]);
  // };

  // const onConnect = (Client: C) => {
  //     console.log("Connected!!!!");
  //     Client.subscribe('hello/world');
  //     setIsConnected(true);
  //     setError('');
  // };

  // const onConnectionLost = (responseObject: any) => {
  //     if (responseObject.errorCode !== 0) {
  //         console.log("onConnectionLost:" + responseObject.errorMessage);
  //         setError('Lost Connection');
  //         setIsConnected(false);
  //     }
  // };

  const getDevicesInstrumentation = React.useCallback(async () => {
    try {
      const res = await getInstrumentationOnZone(zone?.id!);
      setDevices(res.data.Data);
      console.log("Data device" + res.data.Data);
    } catch (e) {
      Alert.alert("Lỗi", `Lỗi lấy dữ liệu nông trại`, [{ text: "OK" }]);
      navigation.navigate("HomeScreen");
      console.log("Error on farm screen" + e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    if (isFocused) {
      getDevicesInstrumentation().then(() => {});
    }
  }, [isFocused]);

  return (
    <SafeAreaView style={AppStyles.appContainer}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 20,
          backgroundColor: AppColors.primaryColor,
          paddingVertical: 12,
          justifyContent: "center",
        }}
      >
        <Pressable
          style={{
            position: "absolute",
            left: 20,
          }}
          onPress={() => {
            navigation.navigate("FarmDetailsScreen");
          }}
        >
          <AntDesign name="left" size={24} color="white" />
        </Pressable>
        <Text style={{ fontSize: 18, color: "white", fontWeight: "500" }}>
          Thiết bị đo
        </Text>
        <Pressable
          style={{
            position: "absolute",
            right: 20,
          }}
          onPress={() => {
            navigation.navigate("DeviceAddScreen", zoneState);
          }}
        >
          <AntDesign name="pluscircleo" size={24} color="white" />
        </Pressable>
      </View>
      <View>
        <ListZoneItem zone={zone} isBorderRadius isBgPrimary isEdit={false} />
      </View>
      {isLoading ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size={"large"} color={AppColors.primaryColor} />
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              //onRefresh={fetchListDevicesOnModule}
            />
          }
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingTop: 30,
          }}
        >
          {devices != null && devices?.length > 0 ? (
            devices.map((item) => (
              <DevicesOnModulesItem key={item?.id} device={item} />
            ))
          ) : (
            <Text>Không có thiết bị trong khu này</Text>
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default DeviceInstrumentationScreen;
