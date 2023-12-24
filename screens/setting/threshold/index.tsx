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
import { ThresholdDisplayModel } from "../../../network/models/setting_threshold/ThresholdModel";
import { getThres } from "../../../network/apis/settings.api";
import { AppColors } from "../../../global";
import { thresholdSetting } from "../../../assets";
import { ListThresItem } from "./thresholdItem";

const SettingsThresScreen = () => {
  const navigation = useNavigation<any>();
  const hangeNavigateEditThresScreen = (item: ThresholdDisplayModel) => {
    navigation.navigate("EditTimerScreen", item);
  };
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const isFocused = useIsFocused();

  const [thres, setThres] = useState<ThresholdDisplayModel[]>([]);

  const FetchListThres = React.useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await getThres();
      setThres(res.data.Data);
    } catch (e) {
      Alert.alert("Lỗi", `Lỗi lấy dữ liệu ngưỡng`, [
        { text: "OK", onPress: navigation.goBack() },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, []);
  React.useEffect(() => {
    if (isFocused) {
      FetchListThres().then(() => {});
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
          Cài đặt giá trị ngưỡng
        </Text>
        <Pressable
          style={{
            position: "absolute",
            right: 20,
          }}
          onPress={() => {
            navigation.navigate("AddNewThresScreen");
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
          source={thresholdSetting}
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
              Đóng mở thiết bị tự động theo giá trị ngưỡng
            </Text>
          </View>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "400",
              marginBottom: 8,
            }}
          >
            Số cặp ngưỡng đóng/mở : {thres.length}
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
            <RefreshControl refreshing={isLoading} onRefresh={FetchListThres} />
          }
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingTop: 30,
          }}
        >
          {thres != null && thres?.length > 0 ? (
            thres.map((item) => (
              <ListThresItem
                key={item?.deviceDriverId + "/" + item.instrumentationId}
                thres={item}
                onPress={() => {}}
              />
            ))
          ) : (
            <Text>Bạn chưa tạo ngưỡng giá trị đóng mở nào</Text>
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default SettingsThresScreen;
