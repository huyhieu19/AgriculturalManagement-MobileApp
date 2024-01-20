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
import React, { useEffect, useState } from "react";
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
import {
  FunctionDeviceType,
  IDeviceOnZone,
} from "../../../../types/device.type";
import { getInstrumentationOnZone } from "../../../../network/apis";
import DevicesInstrumentationItem from "./deviceInstrumentationItem";
import MqttService from "../../../../Mqtt/mqttService";

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
  const [moduleIds, setModuleIds] = useState<string[]>([]);

  const getDevicesInstrumentation = async () => {
    try {
      const res = await getInstrumentationOnZone(zone.id);
      setDevices(res.data.Data);
      // Mảng kết quả module Id
      const uniqueModuleIds = [
        ...new Set(devices.map((device) => device.moduleId)),
      ];
      setModuleIds(uniqueModuleIds);

      console.log("Data device" + res.data.Data);
    } catch (e) {
      Alert.alert("Lỗi", `Lỗi lấy dữ liệu nông trại`, [{ text: "OK" }]);
      navigation.navigate("HomeScreen");
      console.log("Error on farm screen" + e);
    } finally {
      setIsLoading(false);
    }
  };

  const mqttService = new MqttService();
  console.log("Status connection mqtt: " + mqttService.client.isConnected());

  useEffect(() => {
    if (isFocused) {
      getDevicesInstrumentation().then(() => {});
      if (!mqttService.client.isConnected()) {
        // Nếu chưa kết nối, thực hiện kết nối
        mqttService.connect(() => {
          console.log("Connected to MQTT broker");
          console.log("moduleIds lengh" + moduleIds.length);
          // Sau khi kết nối, thực hiện subscribe topic cũ và topic mới
          moduleIds.forEach((item) => {
            mqttService.subscribeTopic(
              "3c531531-d5f5-4fe3-9954-5afd76ff2151/r/" + item
            );
            console.log(
              "sub " + "3c531531-d5f5-4fe3-9954-5afd76ff2151/r/" + item
            );
          });
          mqttService.client.onMessageArrived = onMessageArrived;
        });
        // Thiết lập hàm xử lý khi nhận được message
      } else {
        console.log("Already connected");
        // Nếu client đã kết nối trước đó, thực hiện thêm việc subscribe topic mới
        moduleIds.forEach((item) => {
          mqttService.subscribeTopic(
            "3c531531-d5f5-4fe3-9954-5afd76ff2151/r/" + item
          );
          console.log(
            "sub " + "3c531531-d5f5-4fe3-9954-5afd76ff2151/r/" + item
          );
        });
        //mqttService.client.onMessageArrived = onMessageArrived;
      }
      return () => {
        if (mqttService.client.isConnected()) {
          mqttService.client.disconnect();
        }
      };
      // Kiểm tra xem client đã kết nối chưa
    }
  }, [isFocused, devices.length, moduleIds.length]);

  console.log("devices count: " + devices.length);

  const onMessageArrived = (message: any) => {
    // Tách topic thành mảng các phần tử
    const topicParts = message.topic.split("/");

    // Lấy id từ phần tử thứ 2 của mảng
    const ModuleIdFromTopic: string = topicParts[2];

    console.log("devices count: " + devices.length);
    console.log("ModuleIdFromTopic: " + ModuleIdFromTopic);

    const jsonData = JSON.parse(message.payloadString.toString());
    moduleIds.forEach((e) => {
      if (ModuleIdFromTopic.toLowerCase() === e.toLowerCase()) {
        devices.forEach((element) => {
          const Id = element.id.toLowerCase();
          const values1 = jsonData[Id];
          console.log("ID :" + Id);
          setDevices((prev) => {
            return prev?.map((item) => {
              console.log(item.name);
              console.log(item.nameRef);
              console.log(item.value);
              if (item?.id.toLowerCase() === Id) {
                return {
                  ...item,
                  value: values1,
                };
              }
              return item;
            });
          });
        });
      }
    });

    console.log("Received topic:", message.topic);
    console.log("Received payload:", message.payloadString);
  };

  return (
    <SafeAreaView style={AppStyles.appContainer}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          paddingVertical: 12,
          borderBottomWidth: 0.5,
          paddingHorizontal: 20,
          backgroundColor: AppColors.primaryColor,
          position: "relative",
        }}
      >
        <Pressable
          style={{
            position: "absolute",
            left: 20,
            width: 60,
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
            width: 40,
          }}
          onPress={() => {
            navigation.navigate("DeviceAddScreen", zone);
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
              <DevicesInstrumentationItem key={item?.id} device={item} />
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
