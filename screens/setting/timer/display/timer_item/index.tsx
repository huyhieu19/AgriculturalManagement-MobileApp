import React, { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { TimerDisplayModel } from "../../../../../network/models/setting_timer/TimerModel";
import { AppColors } from "../../../../../global";
import { AppFontSize } from "../../../../../global/styles/AppFontSize";
import { DeviceInformationDisplayModel } from "../../../../../network/models/device_display/deviceInfor";
import { Modal } from "../../../../Modal";
import { DeviceInfo } from "../../../../../network/apis/device.api";

interface ListTimerItemProps {
  timer: TimerDisplayModel;
  onPress: (item: TimerDisplayModel) => void;
  isBorderRadius?: boolean;
  isBgPrimary?: boolean;
  isEdit?: boolean;
  isHistory: boolean;
}
function formatGetOnlyDateDisplayLocalTime(date: any) {
  const dateString = date;
  const dateObject = new Date(dateString);
  // Thêm 7 giờ vào đối tượng Date
  const newDate = new Date(dateObject.getTime() + 7 * 60 * 60 * 1000);
  const formattedDate = newDate.toLocaleString();
  return formattedDate;
}
export const ListTimersItem = (props: ListTimerItemProps) => {
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [deviceInfor, setDeviceInfo] =
    useState<DeviceInformationDisplayModel>();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const handleModal = () => {
    setIsModalVisible(() => !isModalVisible);
  };

  const GetInforDevice = async () => {
    handleModal();
    setIsLoading(true);
    try {
      const deviceId = props.timer.deviceId;
      const res = await DeviceInfo({ deviceId });
      if (res.data.Success) {
        setDeviceInfo(res.data.Data);
      }
    } catch (ex) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TouchableOpacity onPress={GetInforDevice}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
          paddingHorizontal: 20,
          backgroundColor: props?.isBgPrimary ? "#C7E8C7" : AppColors.bgWhite,
          paddingVertical: 16,
          borderRadius: props?.isBorderRadius ? 0 : 15,
          borderBottomLeftRadius: props?.isBorderRadius ? 25 : 15,
          borderBottomRightRadius: props?.isBorderRadius ? 25 : 15,
          borderWidth: 0.5,
          borderColor: AppColors.slate200,
          elevation: 1,
          marginBottom: 15,
          //height: props.isEdit && props.isHistory ? "auto" : 120,
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
                marginBottom: 8,
                marginRight: 20,
              }}
            >
              {props.timer?.deviceName == null ? "" : props.timer?.deviceName}
            </Text>
            {props.isEdit && !props.isHistory ? (
              <TouchableOpacity
                onPress={() => {
                  props.onPress(props.timer);
                  console.log("chuyen sang man edit");
                }}
                style={{ right: 0, top: -10 }}
              >
                <AntDesign
                  name="edit"
                  size={28}
                  color={AppColors.primaryColor}
                />
              </TouchableOpacity>
            ) : null}
          </View>
          <CardInfor
            property={"Mở"}
            value={formatGetOnlyDateDisplayLocalTime(props.timer.openTimer)}
          />
          <CardInfor
            property={"Đóng"}
            value={formatGetOnlyDateDisplayLocalTime(props.timer.shutDownTimer)}
          />
          <CardInfor property={"Ghi chú"} value={props.timer.note ?? ""} />
          {props.isHistory ? (
            <CardInfor
              property={"Hoàn thành đóng"}
              value={String(props.timer.isSuccessOFF)}
            />
          ) : null}
          {props.isHistory ? (
            <CardInfor
              property={"Hoàn thành mở"}
              value={String(props.timer.isSuccessON)}
            />
          ) : null}
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
                value={deviceInfor?.deviceName}
              />
              <CardInfor
                property={"Tên Nông trại"}
                value={deviceInfor?.farmName}
              />
              <CardInfor property={"Tên khu"} value={deviceInfor?.zoneName} />
            </View>
          </View>
        )}
      </Modal>
    </TouchableOpacity>
  );
};

interface CardInforProps {
  property: string;
  value: string | number | null | undefined;
}

const CardInfor = (props: CardInforProps) => {
  return (
    <View
      style={{
        flexDirection: "row",
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Text
        style={{
          color: AppColors.slate600,
          fontSize: AppFontSize.sizeLabel,
          fontWeight: "400",
          marginBottom: 5,
          fontStyle: "italic",
          width: "30%",
        }}
      >
        {props.property}:{" "}
      </Text>
      <Text
        style={{
          //color: "black",
          fontSize: AppFontSize.sizeLabel,
          fontWeight: "500",
          fontStyle: "normal",
          marginBottom: 5,
          width: "65%",
          color: "black",
        }}
      >
        {props.value}
      </Text>
    </View>
  );
};
