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

export interface ValueDevices {
  id: string;
  value: string | undefined | null;
}

const DeviceInstrumentationScreen = () => {
  const route = useRoute<RouteProp<ParamList, "ZoneList">>();
  const zone = route?.params ?? [];
  const isFocused = useIsFocused();
  const navigation = useNavigation<any>();
  const [devices, setDevices] = useState<IDeviceOnZone[]>([]);
  // const [valueDevices, setValueDevices] = useState<ValueDevices[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  // const [moduleIds, setModuleIds] = useState<string[]>([]);

  const getDevicesInstrumentation = async () => {
    try {
      const res = await getInstrumentationOnZone(zone.id);
      if (res.data.Success) {
        setDevices(res.data.Data);
      }

      // // Mảng kết quả module Id
      // const uniqueModuleIds = [
      //   ...new Set(devices.map((device) => device.moduleId)),
      // ];
      // setModuleIds(uniqueModuleIds);
    } catch (e) {
      Alert.alert("Lỗi", `Lỗi lấy dữ liệu nông trại`, [{ text: "OK" }]);
      navigation.navigate("HomeScreen");
      console.log("Error on farm screen" + e);
    } finally {
      setIsLoading(false);
    }
  };
  React.useEffect(() => {
    if (isFocused) {
      getDevicesInstrumentation();
    }
  }, [isFocused]);

  React.useEffect(() => {
    if (isFocused) {
      // Hàm sẽ được gọi lại mỗi 1000 miliseconds (1 giây)
      const intervalId = setInterval(async () => {
        // Gọi hàm của bạn ở đây
        await getDevicesInstrumentation();
      }, 5000);

      // Cleanup function khi component unmount
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [devices]); // Dependency array trống đảm bảo useEffect chỉ chạy một lần khi component được mount

  const mqttService = new MqttService();
  //console.log("Status connection mqtt: " + mqttService.client.isConnected());

  /*
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
              "3c531531-d5f5-4fe3-9954-5afd76ff2151/r/" + item.toUpperCase()
            );
            console.log(
              "sub " +
                "3c531531-d5f5-4fe3-9954-5afd76ff2151/r/" +
                item.toUpperCase()
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
            "3c531531-d5f5-4fe3-9954-5afd76ff2151/r/" + item.toUpperCase()
          );
          console.log(
            "sub " +
              "3c531531-d5f5-4fe3-9954-5afd76ff2151/r/" +
              item.toUpperCase()
          );
        });
        //mqttService.client.onMessageArrived = onMessageArrived;
      }

      devices.forEach((element) => {
        const instan: ValueDevices = {
          id: element.id,
          value: element.value,
        };
        if (!valueDevices.find((p) => p.id == instan.id)) {
          valueDevices.push(instan);
        }
      });

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

          setValueDevices((prev) => {
            return prev?.map((item) => {
              console.log("ID :" + Id);
              // console.log("NAME" + item.name);
              console.log("Id item:" + item?.id.toLowerCase());
              console.log("Id" + Id);
              console.log("Value: " + values1);

              if (item?.id.toLowerCase() === Id) {
                console.log("refact:");
                return {
                  ...item,
                  value: values1,
                };
              } else {
                return item;
              }
            });
          });
          // setDevices((prev) => {
          //   return prev?.map((item) => {
          //     console.log("ID :" + Id);
          //     console.log("NAME" + item.name);
          //     console.log("Id item:" + item?.id.toLowerCase());
          //     console.log("Id" + Id);
          //     console.log("Value: " + values1);

          //     if (item?.id.toLowerCase() === Id) {
          //       return {
          //         ...item,
          //         value: values1,
          //       };
          //     } else {
          //       return item;
          //     }
          //   });
          // });
        });
      }
    });

    console.log("Received topic:", message.topic);
    console.log("Received payload:", message.payloadString);

    console.log({ valueDevices });
  };

  */
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
