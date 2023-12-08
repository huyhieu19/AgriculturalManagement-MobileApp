import {
  View,
  Text,
  Pressable,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppColors } from "../../../global";
import { AntDesign } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../AppNavigator";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { getListModules } from "../../../network/apis";
import { IModule } from "../../../types/module.type";
import ModulesItem from "./module_item";

type ScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "ModulesScreen"
>;

const ModulesScreen = () => {
  const navigation = useNavigation<ScreenNavigationProp>();
  const [module, setModule] = React.useState<IModule[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const isFocused = useIsFocused();

  const fetchListModule = React.useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await getListModules();
      console.log(res);
      console.log("abc");
      setModule(res.data.Data as unknown as IModule[]);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const hangeNavigateScreenAddModule = () => {
    navigation.navigate("ModuleAddScreen");
  };

  const hangeNavigateToModuleDetailScreen = (item: any) => {
    navigation.navigate("ModuleDevicesScreen", item);
  };

  React.useEffect(() => {
    if (isFocused) {
      fetchListModule().then(() => {});
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
            fontWeight: "500",
          }}
        >
          Danh sách Module
        </Text>
        <Pressable
          style={{
            position: "absolute",
            right: 20,
          }}
          onPress={() => {
            hangeNavigateScreenAddModule();
          }}
        >
          <AntDesign name="pluscircleo" size={24} color="white" />
        </Pressable>
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
            <RefreshControl
              refreshing={isLoading}
              onRefresh={fetchListModule}
            />
          }
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingTop: 30,
          }}
        >
          {module != null && module?.length > 0 ? (
            module.map((item) => (
              <ModulesItem
                key={item?.id}
                modules={item}
                onPress={() => hangeNavigateToModuleDetailScreen(item)}
              />
            ))
          ) : (
            <Text>Bạn chưa có sử dụng module nào</Text>
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default ModulesScreen;
