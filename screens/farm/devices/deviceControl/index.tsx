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

  const getDevices = React.useCallback(async () => {
    try {
      const res = await getControlOnZone(zone?.id!);
      setDevices(res.data.Data);
      console.log("Data device" + res.data.Data);
    } catch (e) {
      Alert.alert("Lỗi", `Lỗi lấy dữ liệu nông trại`, [{ text: "OK" }]);
      navigation.navigate("HomeScreen");
      console.log("Error on farm screen" + e);
    } finally {
      setIsLoading(false);
    }
  }, [getControlOnZone]);
  React.useEffect(() => {
    if (isFocused) {
      getDevices().then(() => {});
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
          paddingTop: 10,
          height: 60,
          backgroundColor: AppColors.primaryColor,
          justifyContent: "center",
        }}
      >
        <Pressable
          style={{
            position: "absolute",
            left: 20,
            paddingTop: 10,
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
            paddingTop: 10,
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
