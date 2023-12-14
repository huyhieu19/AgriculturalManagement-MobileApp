import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { IDeviceOnModule } from "../../../../types/device.type";
import { RootStackParamList } from "../../../../AppNavigator";
import { AppColors } from "../../../../global";
import { CardInforProps } from "../../../../network/models/card_display/CardModel";

type DevicesProps = {
  device: IDeviceOnModule;
  onPress?: () => void;
};

type ScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "ModuleDevicesScreen"
>;

const DevicesInstrumentationItem = (props: DevicesProps) => {
  // const navigation = useNavigation<ScreenNavigationProp>();
  // const [isLoading, setIsLoading] = React.useState<boolean>(false);
  // const [deviceSt, setDeviceSt] = useState<IDeviceOnModule>(props.device);
  // const [receivedMessages, setReceivedMessages] = useState<string[]>([]);

  return (
    <TouchableOpacity onPress={props.onPress}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 20,
          backgroundColor: AppColors.bgWhite,
          paddingVertical: 16,
          borderRadius: 15,
          borderWidth: 0.5,
          borderColor: AppColors.slate200,
          elevation: 1,
          marginBottom: 20,
        }}
      >
        {props.device.value == null ? (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: 80,
              height: 80,
            }}
          >
            <ActivityIndicator size={"large"} color={AppColors.primaryColor} />
          </View>
        ) : (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: 80,
              height: 80,
              borderRadius: 40, // Đặt giá trị borderRadius để biến thành vòng tròn
              borderWidth: 2,
            }}
          >
            <Text style={{ fontSize: 30 }}>{props.device.value}</Text>
          </View>
        )}
        <View
          style={{
            marginLeft: 12,
            flex: 1,
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "700",
                marginBottom: 8,
              }}
            >
              {props.device?.name}
            </Text>
          </View>
          <CardInfor
            property={"Gate"}
            value={props.device?.gate?.toString()!}
          />
          <CardInfor
            property={"Hoat động"}
            value={props.device?.isAction ? "Mở" : "Đóng"}
          />
          <CardInfor
            property={"Tự động"}
            value={props?.device.isAuto ? "Tự động" : "Thủ công"}
          />
          <CardInfor
            property={"Sử dụng"}
            value={props?.device.isUsed ? "Có" : "Không"}
          />
          <CardInfor
            property={"Loại"}
            value={
              props?.device.deviceType == "R"
                ? "Thiết bị đo"
                : "Thiết bị điều khiển"
            }
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const CardInfor = (props: CardInforProps) => {
  return (
    <View
      style={{
        flexDirection: "row",
        flex: 1,
        alignItems: "center",
        gap: 10,
      }}
    >
      <Text
        style={{
          color: AppColors.slate600,
          fontSize: 16,
          fontWeight: "400",
          marginBottom: 5,
          fontStyle: "italic",
        }}
      >
        {props.property}:{" "}
      </Text>
      <Text
        style={{
          color: "black",
          fontSize: 16,
          fontWeight: "500",
          fontStyle: "normal",
          marginBottom: 5,
        }}
      >
        {props.value}
      </Text>
    </View>
  );
};

export default DevicesInstrumentationItem;
