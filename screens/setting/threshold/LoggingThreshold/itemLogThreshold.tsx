import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { LogDeviceStatusEntity } from "../../../../network/models/log_display/LogDevice";
import { AppColors } from "../../../../global";

type LogDevicesProps = {
  logsDevice: LogDeviceStatusEntity;
  onPress?: () => void;
};
function formatGetOnlyDateDisplayLocalTime(date: any) {
  if (date != null) {
    const dateString = date;
    const dateObject = new Date(dateString);
    // Thêm 7 giờ vào đối tượng Date
    const newDate = new Date(dateObject.getTime());
    const formattedDate = newDate.toLocaleString();
    return formattedDate;
  } else {
    return null;
  }
}
const LogDevicesThresholdItem = (props: LogDevicesProps) => {
  const GetTypeLog = (type: number) => {
    let result: ValueCardProps = {
      value: "Thủ Công",
      color: AppColors.back,
    };
    if (type === 1) {
      result.value = "Thời gian";
      result.color = AppColors.modalTop;
    } else if (type === 2) {
      result.value = "Giá trị ngưỡng";
      result.color = AppColors.back;
    }
    return result;
  };
  const GetRequest = (type: boolean) => {
    const result1: ValueCardProps = {
      value: "Mở",
      color: AppColors.primaryColor,
    };
    const result2: ValueCardProps = {
      value: "Đóng",
      color: AppColors.red,
    };
    if (type) {
      return result1;
    } else {
      return result2;
    }
  };
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 20,
          backgroundColor: AppColors.bgWhite,
          borderRadius: 15,
          borderWidth: 0.5,
          paddingVertical: 10,
          borderColor: AppColors.slate200,
          elevation: 1,
          marginBottom: 20,
        }}
      >
        <View
          style={{
            marginLeft: 12,
            flex: 1,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "700",
              marginBottom: 8,
            }}
          >
            Dữ liệu đo: {props.logsDevice?.valueSensor ?? ""}
          </Text>
          {/* <CardInfor
            property={"Dữ liệu cảm biến"}
            value={{ value: props.logsDevice?.valueSensor ?? "" }}
          /> */}

          <CardInfor
            property={"Trạng thái chuyển"}
            value={GetRequest(props.logsDevice?.requestOn!)}
          />
          <CardInfor
            property={"Kiểu đóng mở"}
            value={{ value: props.logsDevice?.typeOnOff ?? "" }}
          />
          <CardInfor
            property={"Thời gian"}
            value={{
              value: formatGetOnlyDateDisplayLocalTime(
                props.logsDevice?.valueDate
              ),
            }}
          />

          {/* <CardInfor
            property={"Loại hành vi"}
            value={GetTypeLog(props.logsDevice?.typeOnOff!)}
          /> */}
          {/* <CardInfor
            property={"Thành công"}
            value={{
              value: props.logsDevice.isSuccess
                ? "Thành công"
                : "Không thành công",
              color: props.logsDevice.isSuccess
                ? AppColors.primaryColor
                : AppColors.red,
            }}
          /> */}
        </View>
      </View>
    </TouchableOpacity>
  );
};

interface ValueCardProps {
  value: string | number | null | undefined;
  color?: string | undefined | null;
}

interface CardInforProps {
  property: string;
  value: ValueCardProps;
}

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
          fontSize: 16,
          fontWeight: "500",
          fontStyle: "normal",
          marginBottom: 5,
          color: props.value.color ?? "black",
        }}
      >
        {props.value.value}
      </Text>
    </View>
  );
};

export default LogDevicesThresholdItem;
