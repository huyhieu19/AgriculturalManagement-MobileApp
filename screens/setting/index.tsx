import {
  View,
  Text,
  Pressable,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AppColors } from "../../global";
import { thresholdSetting, timerSetting } from "../../assets";

const SettingsScreen = () => {
  const navigation = useNavigation<any>();

  const goToSettingTimer = () => {
    navigation.navigate("SettingsTimerScreen");
    console.log("asdhfasd");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          paddingVertical: 12,
          borderBottomWidth: 0.5,
          paddingHorizontal: 20,
          backgroundColor: AppColors.primaryColor,
          position: "relative",
        }}
      >
        <Pressable
          style={{
            position: "absolute",
            left: 20,
          }}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <AntDesign name="left" size={24} color="white" />
        </Pressable>
        <Text
          style={{
            color: "white",
            fontSize: 18,
            fontWeight: "500",
          }}
        >
          Cài đặt
        </Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 30,
        }}
      >
        <TouchableOpacity onPress={goToSettingTimer}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 20,
              paddingVertical: 16,
              borderWidth: 0.5,
              borderColor: AppColors.slate200,
              backgroundColor: AppColors.cardTop,
              marginBottom: 20,
              height: 150,
              borderRadius: 20,
            }}
          >
            <Image
              source={timerSetting}
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
                  Đóng mở thiết bị tự động theo giời gian
                </Text>
              </View>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "400",
                  marginBottom: 8,
                }}
              >
                Số mốc thời gian
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 20,
              paddingVertical: 16,
              borderWidth: 0.5,
              borderColor: AppColors.slate200,
              backgroundColor: AppColors.cardTop,
              marginBottom: 20,
              height: 150,
              borderRadius: 20,
            }}
          >
            <Image
              source={thresholdSetting}
              style={{
                width: 80,
                height: 80,
                borderRadius: 5,
              }}
            />
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
                  Đóng mở thiết bị tự động giá trị ngưỡng của thiết bị đo
                </Text>
              </View>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "400",
                  marginBottom: 8,
                }}
              >
                Số mốc giá trị ngưỡng
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsScreen;
