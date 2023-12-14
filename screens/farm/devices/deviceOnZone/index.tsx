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
import { AntDesign } from "@expo/vector-icons";
import { ListZoneItem } from "../../farmDetails/farmDetailsItem";
import { IZoneParams } from "../../../../types/zone.type";
import { IDeviceOnZone } from "../../../../types/device.type";
import { getDevicesOnZone } from "../../../../network/apis";
import DevicesOnModulesItem from "../../../module/modules_main/module_devices_item/device_item";

type ParamList = {
  ZoneValue: IZoneParams;
};

const AllDevicesOnZoneScreen = () => {
  const route = useRoute<RouteProp<ParamList, "ZoneValue">>();
  const zone = route?.params ?? [];
  const navigation = useNavigation<any>();
  const isFocused = useIsFocused();
  const [zoneState, SetZoneState] = useState<IZoneParams>(zone);

  const [devices, setDevices] = useState<IDeviceOnZone[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const getDevices = React.useCallback(async () => {
    try {
      const res = await getDevicesOnZone(zone.id);
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
      getDevices().then(() => {});
    }
  }, [isFocused]);

  const goToAddDeviceScreen = () => {
    navigation.navigate("DeviceAddScreen", zoneState);
  };

  return (
    <SafeAreaView style={AppStyles.appContainer}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 20,
          backgroundColor: AppColors.primaryColor,
          paddingTop: 10,
          height: 60,
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
          Tất cả thiết bị
        </Text>
        <Pressable
          style={{
            position: "absolute",
            right: 20,
            paddingTop: 10,
          }}
          onPress={() => {
            goToAddDeviceScreen();
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

export default AllDevicesOnZoneScreen;
