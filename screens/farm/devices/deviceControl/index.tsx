import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { AppColors, AppStyles } from "../../../../global";
import { AntDesign } from "@expo/vector-icons";
import {
  useRoute,
  RouteProp,
  useNavigation,
  useIsFocused,
} from "@react-navigation/native";
import { IZoneParams } from "../../../../types/zone.type";
import { ListZoneItem } from "../../farmDetails/farmDetailsItem";
import { IDeviceOnZone } from "../../../../types/device.type";
import { getControlOnZone } from "../../../../network/apis";
import DevicesControlItem from "./deviceControlItem";
import { AsyncOnOffDeviceControl } from "../../../../network/apis/controlDevice.api";

type ParamList = {
  ZoneList: IZoneParams;
};

const DeviceControlScreen = () => {
  const route = useRoute<RouteProp<ParamList, "ZoneList">>();
  const zone = route?.params ?? [];
  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [zoneState, SetZoneState] = useState<IZoneParams>(zone);
  const navigation = useNavigation<any>();
  const [devices, setDevices] = useState<IDeviceOnZone[]>([]);

  const getDevices = async () => {
    try {
      const res = await getControlOnZone(zone.id);
      if (res.data.Success) {
        setDevices(res.data.Data);
      }
      console.log("Data device" + res.data.Data);
    } catch (e) {
      Alert.alert("Lỗi", `Lỗi lấy dữ liệu nông trại`, [{ text: "OK" }]);
      navigation.navigate("HomeScreen");
      console.log("Error on farm screen" + e);
    } finally {
      setIsLoading(false);
    }
  };

  const AsyncOnOffDevice = async () => {
    setIsLoading(true);
    const res = await AsyncOnOffDeviceControl();
    const resZone = await getControlOnZone(zone.id);
    if (resZone.data.Success) {
      setDevices(resZone.data.Data);
    }
    if (res.data.Success) {
      setIsLoading(false);
      Alert.alert("Thành công", `Đồng bộ trạng thái thiết bị thành công`, [
        { text: "OK" },
      ]);
    } else {
      Alert.alert("Lỗi", `Đồng bộ trạng thái thiết bị không thành công`, [
        { text: "OK" },
      ]);
      setIsLoading(false);
    }
  };
  React.useEffect(() => {
    if (isFocused) {
      getDevices();
    }
  }, [isFocused]);

  React.useEffect(() => {
    if (isFocused) {
      // Hàm sẽ được gọi lại mỗi 1000 miliseconds (1 giây)
      const intervalId = setInterval(async () => {
        // Gọi hàm của bạn ở đây
        await getDevices();
      }, 5000);

      // Cleanup function khi component unmount
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [devices]); // Dependency array trống đảm bảo useEffect chỉ chạy một lần khi component được mount

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
          Thiết bị điều khiển
        </Text>
        <Pressable
          style={{
            position: "absolute",
            right: 20,
            width: 40,
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
        <Pressable
          style={({ pressed }) => ({
            backgroundColor: pressed ? "darkgreen" : "#FF9800",
            alignSelf: "center",
            paddingVertical: 8,
            paddingHorizontal: 10,
            borderRadius: 5,
            alignItems: "center",
            justifyContent: "center",
          })}
          onPress={AsyncOnOffDevice}
        >
          <Text
            style={{
              marginLeft: 10,
              color: "white",
            }}
          >
            Async status device
          </Text>
        </Pressable>
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
              onRefresh={() => getDevices()}
            />
          }
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingTop: 30,
          }}
        >
          {devices != null && devices?.length > 0 ? (
            devices.map((item) => (
              <DevicesControlItem key={item?.id} device={item} />
            ))
          ) : (
            <Text>Không có thiết bị trong khu này</Text>
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default DeviceControlScreen;
