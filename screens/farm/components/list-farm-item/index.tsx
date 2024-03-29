import React from "react";
import { AppColors } from "../../../../global";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { IFramDetails } from "../../../../types/farm.type";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { CardInforProps } from "../../../../network/models/card_display/CardModel";
import { AppFontSize } from "../../../../global/styles/AppFontSize";

const fakeFarm =
  "https://transcode-v2.app.engoo.com/image/fetch/f_auto,c_limit,h_256,dpr_3/https://assets.app.engoo.com/images/QKVwutsxMHDrNur49p0IxFhxQRqCgYldwxT5Keeq0SQ.jpeg";

interface ListFarmItemProps {
  farm: IFramDetails;
  onPress?: () => void;
  isBorderRadius?: boolean;
  isBgPrimary?: boolean;
  isEdit?: boolean;
}

export const ListFarmItem = (props: ListFarmItemProps) => {
  const navigation = useNavigation<any>();

  const goToEditFarm = () => {
    navigation.navigate("EditFarmScreen", props.farm);
  };

  return (
    <TouchableOpacity onPress={props.onPress}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
          paddingHorizontal: 20,
          backgroundColor: props?.isBgPrimary ? "#C7E8C7" : AppColors.bgWhite,
          paddingVertical: 10,
          borderRadius: props?.isBorderRadius ? 0 : 15,
          borderBottomLeftRadius: props?.isBorderRadius ? 25 : 15,
          borderBottomRightRadius: props?.isBorderRadius ? 25 : 15,
          borderWidth: 0.5,
          borderColor: AppColors.slate200,
          marginBottom: props.isEdit ? 20 : 2,
          height: props.isEdit ? "auto" : 150,
        }}
      >
        <Image
          source={{
            uri: fakeFarm,
          }}
          style={{
            alignItems: "center",
            width: 100,
            height: 100,
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
                //marginBottom: 8,
              }}
            >
              {props.farm?.name}
            </Text>
            {props.isEdit ? (
              <TouchableOpacity onPress={goToEditFarm} style={{ right: 0 }}>
                <AntDesign name="edit" size={24} color="black" />
              </TouchableOpacity>
            ) : null}
          </View>
          <CardInfor
            property={"Diện tích (m2)"}
            value={{ value: props.farm.area }}
          />
          <CardInfor
            property={"Số lượng khu"}
            value={{ value: props.farm.countZone }}
          />
          <CardInfor
            property={"Địa chỉ"}
            value={{ value: props.farm.address }}
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
        //justifyContent: "space-between",
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
          marginLeft: 20,
        }}
      >
        {props.value.value}
      </Text>
    </View>
  );
};
