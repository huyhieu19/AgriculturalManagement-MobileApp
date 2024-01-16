import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { IDeviceOnModule } from "../../../../types/device.type";
import { AppColors } from "../../../../global";
import { offDevcie, onDevcie } from "../../../../assets";
import {
  AsyncOnOffDeviceControl,
  OnOffDeviceControl,
} from "../../../../network/apis/controlDevice.api";
import { OnOffDeviceQueryModel } from "../../../../network/models/device_control/deviceControl.model";

type DevicesProps = {
  device: IDeviceOnModule;
  onPress?: () => void;
};

const DevicesControlItem = (props: DevicesProps) => {
  const [isOn, setIsOn] = useState<boolean>(props.device.isAction);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const SetIsOn = (ison: boolean) => {
    if (ison) {
      return { value: "Mở", color: AppColors.primaryColor };
    } else {
      return { value: "Đóng", color: AppColors.red };
    }
  };
  const SetIsAuto = (isauto: boolean) => {
    if (isauto) {
      return { value: "Tự động", color: AppColors.primaryColor };
    } else {
      return { value: "Thủ công", color: AppColors.back };
    }
  };

  const onOffDevice = async () => {
    setIsLoading(true);
    const param: OnOffDeviceQueryModel = {
      moduleId: props.device.moduleId,
      deviceId: props.device.id,
      requestOn: !isOn,
      deviceName: props.device.name,
      deviceNameNumber: "",
      deviceType: 1,
    };
    const res = await OnOffDeviceControl(param);
    console.log("isOn" + isOn);
    if (res.data.Data) {
      setIsLoading(false);
      setIsOn(!isOn);
    } else {
      Alert.alert(
        "Lỗi",
        isOn
          ? `Đóng thiết bị ${props.device.name} không thành công`
          : `Mở thiết bị ${props.device.name} không thành công`,
        [{ text: "OK" }]
      );
      setIsLoading(false);
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
        {isLoading ? (
          <View
            style={{
              width: 80,
              height: 80,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ActivityIndicator size={"large"} color={AppColors.primaryColor} />
          </View>
        ) : (
          <TouchableOpacity onPress={() => onOffDevice()}>
            <Image
              source={isOn ? onDevcie : offDevcie}
              style={{
                width: 80,
                height: 80,
                borderRadius: 5,
              }}
            />
          </TouchableOpacity>
        )}
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
            {props.device?.name}
          </Text>
          <CardInfor
            property={"Gate"}
            value={{ value: props.device?.gate?.toString()! }}
          />
          <CardInfor property={"Hoat động"} value={SetIsOn(isOn)} />
          <CardInfor
            property={"Tự động"}
            value={SetIsAuto(props.device?.isAuto)}
          />
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

export default DevicesControlItem;
