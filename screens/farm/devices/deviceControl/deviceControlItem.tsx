import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { IDeviceOnModule } from "../../../../types/device.type";
import { AppColors } from "../../../../global";
import { offDevcie, onDevcie } from "../../../../assets";
import { OnOffDeviceControl } from "../../../../network/apis/controlDevice.api";
import MqttService from "../../../../Mqtt/mqttService";

type DevicesProps = {
  device: IDeviceOnModule;
  onPress?: () => void;
};

const DevicesControlItem = (props: DevicesProps) => {
  const [isOn, setIsOn] = useState<boolean>(props.device.isAction);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [receivedMessages, setReceivedMessages] = useState<string>("");
  // const mqttService = new MqttService();

  // useEffect(() => {
  //   // Kiểm tra xem client đã kết nối chưa
  //   if (!mqttService.client.isConnected()) {
  //     // Nếu chưa kết nối, thực hiện kết nối
  //     mqttService.connect(() => {
  //       console.log("Connected to MQTT broker");

  //       // Sau khi kết nối, thực hiện subscribe topic cũ và topic mới
  //       mqttService.subscribeTopic("fdfcvxzcvzxvbbx");
  //     });

  //     // Thiết lập hàm xử lý khi nhận được message
  //     mqttService.client.onMessageArrived = onMessageArrived;
  //   } else {
  //     console.log("da ket noi trươc đó");
  //     // Nếu client đã kết nối trước đó, thực hiện thêm việc subscribe topic mới
  //     mqttService.subscribeTopic("new_topic");
  //   }

  //   // Cleanup function khi component unmount
  //   return () => {
  //     mqttService.client.disconnect();
  //   };
  // }, []);

  // const onMessageArrived = (message: any) => {
  //   console.log("Received message1:", message.payloadString);

  //   // Cập nhật state để hiển thị message trên màn hình
  //   // setReceivedMessages((prevMessages) => [
  //   //   ...prevMessages,
  //   //   message.payloadString,
  //   // ]);
  //   setReceivedMessages(message.payloadString);
  // };

  const onOffDevice = async () => {
    const res = await OnOffDeviceControl({
      moduleId: props.device.moduleId,
      deviceId: props.device.id,
      requestOn: !isOn,
      deviceNameNumber: "",
      deviceType: 1,
    });
    console.log(isOn);
    const timeoutId = setTimeout(() => {
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
    }, 10000);
    return () => clearTimeout(timeoutId);
  };
  const pressOnOff = () => {
    setIsLoading(true);
    onOffDevice();
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
        <TouchableOpacity onPress={pressOnOff}>
          {isLoading ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                width: 80,
                height: 80,
              }}
            >
              <ActivityIndicator
                size={"large"}
                color={AppColors.primaryColor}
              />
            </View>
          ) : (
            <Image
              source={isOn ? onDevcie : offDevcie}
              style={{
                width: 80,
                height: 80,
                borderRadius: 5,
              }}
            />
          )}
        </TouchableOpacity>
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
            value={props.device?.gate?.toString()!}
          />
          <CardInfor property={"Hoat động"} value={isOn ? "Mở" : "Đóng"} />
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
          <CardInfor property={"Giá trị"} value={receivedMessages.toString()} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

interface CardInforProps {
  property: string;
  value: string | number | null;
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

export default DevicesControlItem;
