import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { ThresholdDisplayModel } from "../../../../network/models/setting_threshold/ThresholdModel";
import { AppColors } from "../../../../global";
import { AppFontSize } from "../../../../global/styles/AppFontSize";

interface ListThresItemProps {
  thres: ThresholdDisplayModel;
  onPress: (item: ThresholdDisplayModel) => void;
  isBorderRadius?: boolean;
  isBgPrimary?: boolean;
  isEdit?: boolean;
}

export const ListThresItem = (props: ListThresItemProps) => {
  const GetTypeDevice = (typeDevice: string | null) => {
    if (typeDevice === "ND") {
      return "Nhiệt độ";
    } else if (typeDevice === "DA") {
      return "Độ ẩm";
    }
    return "Phát hiện mưa";
  };
  return (
    <TouchableOpacity style={{ flexDirection: "row" }}>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "flex-start",
          paddingHorizontal: 5,
          backgroundColor: props?.isBgPrimary ? "#C7E8C7" : AppColors.bgWhite,
          paddingVertical: 16,
          borderWidth: 0.5,
          borderColor: AppColors.slate200,
          elevation: 1,
          //marginBottom: props.isEdit ? 20 : 2,
          height: props.isEdit ? "auto" : 130,
          marginBottom: 20,
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
                fontSize: AppFontSize.sizeLabel,
                fontWeight: "600",
                marginRight: 20,
              }}
            >
              {props.thres?.deviceInstrumentationName ?? ""}
            </Text>
          </View>
          <CardInfor
            property={"Ngưỡng mở"}
            value={props.thres?.thresholdValueOn}
          />
          <CardInfor
            property={"Ngưỡng đóng"}
            value={props.thres?.thresholdValueOff}
          />
          <CardInfor
            property={"Loại"}
            value={GetTypeDevice(props.thres?.typeDevice)}
          />
        </View>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "flex-start",
          paddingHorizontal: 5,
          backgroundColor: props?.isBgPrimary ? "#C7E8C7" : AppColors.bgWhite,
          paddingVertical: 16,
          borderWidth: 0.5,
          borderColor: AppColors.slate200,
          elevation: 1,
          marginBottom: props.isEdit ? 20 : 2,
          height: props.isEdit ? "auto" : 130,
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
                fontSize: AppFontSize.sizeLabel,
                fontWeight: "600",
              }}
            >
              {props.thres?.deviceDriverName ?? ""}
            </Text>
            {props.isEdit ? (
              <TouchableOpacity
                onPress={() => {
                  props.onPress(props.thres);
                  console.log("chuyen sang man edit");
                }}
                style={{ right: 10, top: -10 }}
              >
                <AntDesign name="edit" size={24} color="black" />
              </TouchableOpacity>
            ) : null}
          </View>
          <CardInfor
            property={"Trạng thái"}
            value={props.thres?.deviceDriverAction ? "On" : "Off"}
          />
          <CardInfor
            property={"Kiểu đóng mở"}
            value={props.thres?.onInUpperThreshold ? "1" : "2"}
          />
        </View>
      </View>
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
          fontSize: AppFontSize.sizeDetail,
          fontWeight: "400",
          marginTop: 5,
          fontStyle: "italic",
        }}
      >
        {props.property}:{" "}
      </Text>
      <Text
        style={{
          fontSize: AppFontSize.sizeDetail,
          fontWeight: "500",
          fontStyle: "normal",
          marginTop: 5,
          maxWidth: "70%",
          color: "black",
        }}
      >
        {props.value}
      </Text>
    </View>
  );
};
