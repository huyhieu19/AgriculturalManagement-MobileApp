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
  return (
    <TouchableOpacity style={{ flexDirection: "row" }}>
      <View
        style={{
          flex: 1,
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
          marginBottom: props.isEdit ? 20 : 2,
          height: props.isEdit ? "auto" : 120,
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
            property={"Thiết bị đo"}
            value={props.thres?.deviceDriverName}
          />
        </View>
      </View>
      <View
        style={{
          flex: 1,
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
          marginBottom: props.isEdit ? 20 : 2,
          height: props.isEdit ? "auto" : 120,
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
            property={"Thiết bị đo"}
            value={props.thres?.deviceDriverName}
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
          width: "70%",
          color: "black",
        }}
      >
        {props.value}
      </Text>
    </View>
  );
};
