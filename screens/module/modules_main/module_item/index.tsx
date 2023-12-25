import { Image, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { AppColors } from "../../../../global";
import { formatGetOnlyDate } from "../../../../utils";
import { IModule } from "../../../../types/module.type";
import { esp8266 } from "../../../../assets";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
interface ModulesItemProps {
  modules: IModule;
  onPress?: () => void;
  isBorderRadius?: boolean;
  isBgPrimary?: boolean;
}

const ModulesItem = (props: ModulesItemProps) => {
  const navigation = useNavigation<any>();

  const goToEditModduleScreen = () => {
    navigation.navigate("EditModuleScreen", props.modules);
  };

  return (
    <TouchableOpacity onPress={props.onPress}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
          // marginHorizontal: 20,
          paddingHorizontal: 20,
          backgroundColor: props?.isBgPrimary ? "#C7E8C7" : AppColors.bgWhite,
          paddingVertical: 16,
          borderRadius: props?.isBorderRadius ? 0 : 15,
          borderWidth: 0.5,
          borderColor: AppColors.slate200,
          elevation: 1,
          marginBottom: 20,
        }}
      >
        <Image
          source={esp8266}
          style={{
            width: 70,
            height: 70,
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
              {props.modules?.nameRef}
            </Text>
            <TouchableOpacity
              onPress={() => goToEditModduleScreen()}
              style={{ right: 0 }}
            >
              <AntDesign name="edit" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <CardInfor property={"Loại"} value={props.modules.name} />
          <CardInfor property={"Ghi chú"} value={props.modules.note} />
          <CardInfor
            property={"Ngày tạo"}
            value={String(formatGetOnlyDate(props?.modules?.dateCreated!))}
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
          fontSize: 15,
          fontWeight: "500",
          fontStyle: "normal",
          maxWidth: "60%",
        }}
      >
        {props.value}
      </Text>
    </View>
  );
};

export default ModulesItem;
