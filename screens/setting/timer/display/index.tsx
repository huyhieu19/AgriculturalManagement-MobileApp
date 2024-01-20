import {
  View,
  Text,
  Pressable,
  Image,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { AppColors } from "../../../../global";
import { timerSetting } from "../../../../assets";
import { TimerDisplayModel } from "../../../../network/models/setting_timer/TimerModel";
import { ListTimersItem } from "./timer_item";
import { getTimers } from "../../../../network/apis/settings.api";

const SettingsTimerScreen = () => {
  const navigation = useNavigation<any>();
  const hangeNavigateEditTimerScreen = (item: TimerDisplayModel) => {
    navigation.navigate("EditTimerScreen", item);
  };
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const isFocused = useIsFocused();

  const [timers, setTimers] = useState<TimerDisplayModel[]>([]);

  const FetchListTimer = async () => {
    setIsLoading(true);
    try {
      const res = await getTimers();
      setTimers(res.data.Data);
    } catch (e) {
      Alert.alert("Lỗi", `Lỗi lấy dữ liệu thời gian`, [
        { text: "OK", onPress: navigation.goBack() },
      ]);
    } finally {
      setIsLoading(false);
    }
  };
  React.useEffect(() => {
    if (isFocused) {
      FetchListTimer();
    } else {
      setIsLoading(true);
    }
  }, [isFocused]);
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
            width: 60,
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
            fontWeight: "600",
          }}
        >
          Cài đặt hẹn giờ thiết bị
        </Text>
        <Pressable
          style={{
            position: "absolute",
            right: 20,
            width: 40,
          }}
          onPress={() => {
            navigation.navigate("AddNewTimerScreen");
          }}
        >
          <AntDesign name="pluscircleo" size={24} color="white" />
        </Pressable>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 20,
          paddingVertical: 16,
          borderWidth: 0.5,
          borderColor: AppColors.slate200,
          elevation: 1,
          marginBottom: 2,
          height: 120,
          borderBottomRightRadius: 20,
          borderBottomLeftRadius: 20,
          backgroundColor: AppColors.cardTop,
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
              fontSize: 14,
              fontWeight: "400",
              marginBottom: 8,
            }}
          >
            Số cặp mốc thời gian : {timers.length}
          </Text>
        </View>
      </View>
      {isLoading ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size={"large"} color={AppColors.primaryColor} />
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={FetchListTimer} />
          }
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingTop: 30,
          }}
        >
          {timers != null && timers?.length > 0 ? (
            timers.map((item) => (
              <ListTimersItem
                key={item?.id}
                timer={item}
                onPress={() => hangeNavigateEditTimerScreen(item)}
                isEdit={true}
                isBgPrimary={false}
                isHistory={false}
              />
            ))
          ) : (
            <Text>Bạn chưa tạo thời gian hẹn giờ nào</Text>
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default SettingsTimerScreen;
