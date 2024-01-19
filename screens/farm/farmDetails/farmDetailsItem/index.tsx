import React, { useState } from "react";
import { AppColors } from "../../../../global";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { IZoneParams } from "../../../../types/zone.type";
import { greenhouseIcon } from "../../../../assets";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { IFramDetails } from "../../../../types/farm.type";
import { CardInforProps } from "../../../../network/models/card_display/CardModel";
import { AppFontSize } from "../../../../global/styles/AppFontSize";
interface ListZonetemProps {
  zone: IZoneParams;
  farm?: IFramDetails;
  onPress?: () => void;
  isBorderRadius?: boolean;
  isBgPrimary?: boolean;
  isEdit?: boolean;
}

export const ListZoneItem = (props: ListZonetemProps) => {
  const navigation = useNavigation<any>();
  const [zoneSt, setZoneSt] = useState<IZoneParams>(props.zone);
  const goToEditZone = () => {
    navigation.navigate("EditZoneScreen", zoneSt, props?.farm);
  };

  return (
    <TouchableOpacity onPress={props.onPress}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 20,
          backgroundColor: props?.isBgPrimary ? "#C7E8C7" : AppColors.bgWhite,
          paddingVertical: 16,
          borderRadius: props?.isBorderRadius ? 0 : 15,
          borderBottomLeftRadius: props?.isBorderRadius ? 25 : 15,
          borderBottomRightRadius: props?.isBorderRadius ? 25 : 15,
          borderWidth: 0.5,
          borderColor: AppColors.slate200,
          marginBottom: props.isEdit ? 20 : 2,
          height: 200,
        }}
      >
        <Image
          source={greenhouseIcon}
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
              {props.zone?.zoneName}
            </Text>
            {props.isEdit ? (
              <TouchableOpacity onPress={goToEditZone} style={{ right: 0 }}>
                <AntDesign name="edit" size={24} color="black" />
              </TouchableOpacity>
            ) : null}
          </View>
          <CardInfor
            property={"Diện tích"}
            value={{ value: props.zone.area }}
          />
          <CardInfor
            property={"Chức năng"}
            value={{ value: props.zone.function }}
          />
          <CardInfor
            property={"SL thiết bị đo"}
            value={{ value: props.zone.countInstrumentation }}
          />
          <CardInfor
            property={"SL thiết bị điều khiển"}
            value={{ value: props.zone.countDeviceDriver }}
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
          fontSize: AppFontSize.sizeLabel,
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
          fontSize: AppFontSize.sizeDetail,
          fontWeight: "500",
          fontStyle: "normal",
          marginBottom: 5,
        }}
      >
        {props.value.value}
      </Text>
    </View>
  );
};
