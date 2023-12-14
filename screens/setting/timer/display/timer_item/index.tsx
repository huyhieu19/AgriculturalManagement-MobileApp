import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { TimerDisplayModel } from "../../../../../network/models/setting_timer/TimerModel";
import { AppColors } from "../../../../../global";
import { AppFontSize } from "../../../../../global/styles/AppFontSize";
import { formatDateTimeDisplay } from "../../../../../utils";

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
          height: props.isEdit ? "auto" : 120,
        }}
      >
        {/* <Image
          source={{
            uri: fakeFarm,
          }}
          style={{
            width: 100,
            height: 100,
            borderRadius: 5,
          }}
        /> */}
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
            {props.isEdit ? (
              <TouchableOpacity
                onPress={goToEditFarm}
                style={{ right: 10, top: -10 }}
              >
                <AntDesign name="edit" size={24} color="black" />
              </TouchableOpacity>
            ) : null}
          </View>
          <CardInfor
            property={"Mở"}
            value={formatDateTimeDisplay(props.timer.openTimer)}
          />
          <CardInfor
            property={"Đóng"}
            value={formatDateTimeDisplay(props.timer.shutDownTimer)}
          />
          <CardInfor
            property={"Hoàn thành"}
            value={
              props.timer.isSuccessON || props.timer.isSuccessOFF
                ? "Đã hoàn thành"
                : "Chưa hoàn thành"
            }
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
          color:
            props.property === "Hoàn thành" && props.value === "Chưa hoàn thành"
              ? "#EF4040"
              : props.value === "Đã hoàn thành" &&
                props.property === "Hoàn thành"
              ? "#65B741"
              : "black",
        }}
      >
        {props.value}
      </Text>
    </View>
  );
};
