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
      // Mảng kết quả
      const arrayOfValues: string[] = [];

      // Duyệt qua mảng các đối tượng và lấy ra mảng của phần tử 'value'
      res.data.Data.forEach((obj) => {
        arrayOfValues.push(obj.id);
      });
      setModuleIds(arrayOfValues);

      console.log("Data device" + res.data.Data);
    } catch (e) {
      Alert.alert("Lỗi", `Lỗi lấy dữ liệu nông trại`, [{ text: "OK" }]);
      navigation.navigate("HomeScreen");
      console.log("Error on farm screen" + e);
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect(() => {
  //   // Hàm này sẽ chạy mỗi khi giá trị của moduleIds thay đổi
  //   console.log("deviceId count: " + moduleIds.length);
  // }, [moduleIds]);

  const mqttService = new MqttService();
  console.log("Status connection mqtt: " + mqttService.client.isConnected());
  useEffect(() => {
    if (isFocused) {
      getDevicesInstrumentation().then(() => {
        if (!mqttService.client.isConnected()) {
          // Nếu chưa kết nối, thực hiện kết nối
          mqttService.connect(() => {
            console.log("Connected to MQTT broker");
            // Sau khi kết nối, thực hiện subscribe topic cũ và topic mới
            mqttService.subscribeTopic(
              "3c531531-d5f5-4fe3-9954-5afd76ff2151/r/#"
            );
            mqttService.client.onMessageArrived = onMessageArrived;
          });
          // Thiết lập hàm xử lý khi nhận được message
        } else {
          console.log("Already connected");
          // Nếu client đã kết nối trước đó, thực hiện thêm việc subscribe topic mới
          //mqttService.subscribeTopic("3c531531-d5f5-4fe3-9954-5afd76ff2151/#");
          //mqttService.client.onMessageArrived = onMessageArrived;
        }
        return () => {
          if (mqttService.client.isConnected()) {
            mqttService.client.disconnect();
          }
        };
      });
      // Kiểm tra xem client đã kết nối chưa
    }
  }, [isFocused]);

  const onMessageArrived = (message: any) => {
    // Tách topic thành mảng các phần tử
    const topicParts = message.topic.split("/");

    // Lấy id từ phần tử thứ 2 của mảng
    const deviceIdFromTopic = topicParts[2];

    console.log("devices count: " + devices.length);
    console.log("deviceIdFromTopic: " + deviceIdFromTopic);

    const jsonData = JSON.parse(message.payloadString.toString());
    const Id = "6ea49bef-b141-4567-b43a-ce4fbf1ad348";
    const values1 = jsonData[Id];
    console.log(values1);

    devices.forEach((element) => {
      const Id = element.id;
      const values1 = jsonData[Id];

      console.log("ID :" + values1);

      setDevices((prev) => {
        return prev?.map((item) => {
          console.log(item.name);
          console.log(item.nameRef);
          if (item?.id === values1) {
            return {
              ...item,
              value: values1,
            };
          }
          return item;
        });
      });
    });
    const values2 = jsonData.AirHumidity;
    const values3 = jsonData.SoilMoisture;
    const values4 = jsonData.RainDetection;
    // Xử lý logic B ở đây
    // Cập nhật state với mảng devices đã được cập nhật
    // setDevices((prev) => {
    //   return prev?.map((item) => {
    //     console.log(item.name);
    //     console.log(item.nameRef);
    //     if (item?.nameRef === FunctionDeviceType.AirTemperature) {
    //       return {
    //         ...item,
    //         value: values1,
    //       };
    //     } else if (item?.nameRef === FunctionDeviceType.AirHumidity) {
    //       return {
    //         ...item,
    //         value: values2,
    //       };
    //     } else if (item?.nameRef === FunctionDeviceType.SoilMoisture) {
    //       return {
    //         ...item,
    //         value: values3,
    //       };
    //     } else if (item?.nameRef === FunctionDeviceType.RainDetection) {
    //       return {
    //         ...item,
    //         value: values4,
    //       };
    //     }
    //     return item;
    //   });
    // });
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
