import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React from "react";
import { IDeviceOnModule } from "../../../../types/device.type";
import { AppColors } from "../../../../global";
import { FunctionDeviceType } from "../../../../network/models";

type DevicesProps = {
  device: IDeviceOnModule;
  onPress?: () => void;
};
const DevicesInstrumentationItem = (props: DevicesProps) => {
  const GetValue = (value: string, unit: string | null) => {
    return (
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Text style={{ fontSize: 25, color: "green", fontWeight: "500" }}>
          {value}{" "}
        </Text>
        <Text style={{ fontSize: 25 }}>{unit}</Text>
      </View>
    );
  };

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
          <View>
            {/* {props.device.nameRef == FunctionDeviceType.AirHumidity ? (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  width: 110,
                  height: 90,
                  borderRadius: 10, // Đặt giá trị borderRadius để biến thành vòng tròn
                  borderWidth: 0.5,
                }}
              >
                <Text style={{ fontSize: 20, color: "green" }}>
                  {props.device.value1} *C
                </Text>
              </View>
            ) : ( */}
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: 110,
                height: 110,
                borderRadius: 50, // Đặt giá trị borderRadius để biến thành vòng tròn
                borderWidth: 0.5,
                backgroundColor: AppColors.bgSlate50,
              }}
            >
              {GetValue(props.device.value, props.device.unit)}
            </View>
            {/* )} */}
          </View>
        )}
        <View
          style={{
            marginLeft: 20,
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

export default DevicesInstrumentationItem;
