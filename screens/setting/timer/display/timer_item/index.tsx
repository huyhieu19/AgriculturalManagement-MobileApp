import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { TimerDisplayModel } from "../../../../../network/models/setting_timer/TimerModel";
import { AppColors } from "../../../../../global";

const fakeFarm =
  "https://transcode-v2.app.engoo.com/image/fetch/f_auto,c_limit,h_256,dpr_3/https://assets.app.engoo.com/images/QKVwutsxMHDrNur49p0IxFhxQRqCgYldwxT5Keeq0SQ.jpeg";

interface ListTimerItemProps {
  timer: TimerDisplayModel;
  onPress: () => void;
  isBorderRadius?: boolean;
  isBgPrimary?: boolean;
  isEdit?: boolean;
}

export const ListTimersItem = (props: ListTimerItemProps) => {
  const navigation = useNavigation<any>();
  console.log(props.timer.deviceName);
  const goToEditFarm = () => {
    //navigation.navigate("EditFarmScreen", props.farm);
  };

  return (
    <TouchableOpacity onPress={props.onPress}>
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
          marginBottom: props.isEdit ? 20 : 2,
          height: props.isEdit ? "auto" : 150,
        }}
      >
        <Image
          source={{
            uri: fakeFarm,
          }}
          style={{
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
                marginBottom: 8,
              }}
            >
              {props.timer.nameRef}
            </Text>
            {props.isEdit ? (
              <TouchableOpacity onPress={goToEditFarm} style={{ right: 0 }}>
                <AntDesign name="edit" size={24} color="black" />
              </TouchableOpacity>
            ) : null}
          </View>
          <CardInfor
            property={"Tên thiết bị"}
            value={
              props.timer?.deviceName == null ? "" : props.timer?.deviceName
            }
          />
          <CardInfor
            property={"Mở"}
            value={props.timer?.openTimer?.toString()!}
          />
          <CardInfor
            property={"Đóng"}
            value={props.timer?.shutDownTimer?.toString()!}
          />
          <CardInfor property={"Ngày Tạo"} value={props?.timer?.dateCreated!} />
          <CardInfor property={"Cập nhật"} value={props?.timer?.dateUpdated!} />
          <CardInfor property={"Chú ý"} value={props?.timer?.note!} />
          <CardInfor
            property={"Hoàn thành"}
            value={
              props.timer.isSuccessON || props.timer.isSuccessOFF
                ? "Rồi"
                : "Chưa"
            }
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

interface CardInforProps {
  property: string;
  value: string | number;
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
          fontSize: 10,
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
          fontSize: 10,
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
