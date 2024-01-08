import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Pressable,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { IDeviceOnModule } from "../../../../../types/device.type";
import { AppColors } from "../../../../../global";
import { deviceIot } from "../../../../../assets";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../../../AppNavigator";
import { CardInforProps } from "../../../../../network/models/card_display/CardModel";
import { Modal } from "../../../../Modal";
import { AppFontSize } from "../../../../../global/styles/AppFontSize";
import { DeviceInformationDisplayModel } from "../../../../../network/models/device_display/deviceInfor";
import { DeviceInfo } from "../../../../../network/apis/device.api";
import { AntDesign, FontAwesome } from "@expo/vector-icons";

type DevicesProps = {
  device: IDeviceOnModule;
};

type ScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "ModuleDevicesScreen"
>;

const DevicesOnModulesItem = (props: DevicesProps) => {
  const mockDevice: DeviceInformationDisplayModel = {
    deviceName: props.device.name ?? "Chưa đặt tên",
    farmName: "Chưa thêm vào nông trại",
    zoneName: "Chưa thêm vào khu",
  };

  const navigation = useNavigation<ScreenNavigationProp>();
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [deviceInfor, setDeviceInfo] =
    useState<DeviceInformationDisplayModel>(mockDevice);
  const [deviceSt, setDeviceSt] = useState<IDeviceOnModule>(props.device);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const goToEditDevice = () => {
    navigation.navigate("EditDeviceScreen", deviceSt);
  };
  const handleModal = () => {
    setIsModalVisible(() => !isModalVisible);
  };
  const GetInforDevice = async () => {
    handleModal();
    setIsLoading(true);
    try {
      const deviceId = props.device.id;
      if (
        props.device.name != null &&
        props.device.isUsed &&
        props.device.zoneId != null
      ) {
        const res = await DeviceInfo({ deviceId });
        if (res.data.Success) {
          setDeviceInfo(
            res.data.Data as unknown as DeviceInformationDisplayModel
          );
        } else {
          setDeviceInfo(mockDevice);
        }
      } else {
        setDeviceInfo(mockDevice);
      }
    } catch (ex) {
      Alert.alert("Lỗi", `Không thể lấy thông tin thiết bị`, [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TouchableOpacity onPress={GetInforDevice}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          // marginHorizontal: 20,
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
        <Image
          source={deviceIot}
          style={{
            width: 80,
            height: 80,
            borderRadius: 5,
          }}
        />
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
            <TouchableOpacity onPress={goToEditDevice} style={{ right: 0 }}>
              <AntDesign name="edit" size={24} color="black" />
            </TouchableOpacity>
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
      <Modal isVisible={isModalVisible} title="Thong in device">
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
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
              paddingHorizontal: 20,
              paddingVertical: 16,
              borderWidth: 0.5,
              borderColor: AppColors.slate200,
              elevation: 1,
              backgroundColor: "white",
              minHeight: 150,
            }}
          >
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
                    fontSize: AppFontSize.sizeTitle,
                    fontWeight: "600",
                    marginRight: 20,
                  }}
                >
                  Thông tin thiết bị
                </Text>
                <Pressable
                  style={{
                    position: "absolute",
                    right: 0,
                    top: 0,
                  }}
                  onPress={handleModal}
                >
                  <FontAwesome name="close" size={30} color="black" />
                </Pressable>
              </View>
              <CardInfor
                property={"Tên thiết bị"}
                value={deviceInfor?.deviceName ?? "Thiết bị chưa được đặt tên"}
              />
              <CardInfor
                property={"Tên Nông trại"}
                value={
                  deviceInfor?.farmName ?? "Bạn chưa thêm vào nông trại nào"
                }
              />
              <CardInfor
                property={"Tên khu"}
                value={deviceInfor?.zoneName ?? "Bạn chưa thêm vào khu nào"}
              />
            </View>
          </View>
        )}
      </Modal>
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

export default DevicesOnModulesItem;
