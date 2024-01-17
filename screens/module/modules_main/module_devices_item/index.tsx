import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
} from "react-native";
import React, { useState } from "react";
import {
  useNavigation,
  RouteProp,
  useRoute,
  useIsFocused,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../../AppNavigator";
import { AppColors, AppStyles } from "../../../../global";
import { AntDesign } from "@expo/vector-icons";
import DevicesOnModulesItem from "./device_item";
import { IModule } from "../../../../types/module.type";
import { IDeviceOnModule } from "../../../../types/device.type";
import { getListModules } from "../../../../network/apis";
import { AppFontSize } from "../../../../global/styles/AppFontSize";
import ModulesItem from "../module_item";

type ScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "ModuleDevicesScreen"
>;

type ModulesItemProps = {
  modules: IModule;
};

const ModuleDevicesScreen = () => {
  const route = useRoute<RouteProp<ModulesItemProps, "modules">>();
  const navigation = useNavigation<ScreenNavigationProp>();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [moduleId, setModuleId] = useState<string>(route.params.id);
  const [deviceSt, setDeviceSt] = React.useState<IDeviceOnModule[]>(
    route.params?.devices!
  );

  const isFocused = useIsFocused();

  const FindModule = (modules: IModule[], id: string) => {
    const moduleFinded = modules.find((p) => p.id === id);
    setModuleId(moduleFinded?.id!);
    setDeviceSt(moduleFinded?.devices!);
  };

  const fetchListModule = React.useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await getListModules();
      FindModule(res.data.Data as unknown as IModule[], moduleId);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    if (isFocused) {
      fetchListModule().then(() => {});
    }
  }, [isFocused]);

  return (
    <SafeAreaView style={AppStyles.appContainer}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          //paddingVertical: 15,
          paddingBottom: 15,
          paddingTop: 20,
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
            fontSize: AppFontSize.sizeTitle,
            fontWeight: "500",
          }}
        >
          Danh sách thiết bị trên module
        </Text>
      </View>

      <ModulesItem
        modules={route.params}
        isBgPrimary={true}
        isEdit={false}
        isBorderRadius={false}
      />

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
          {deviceSt != null && deviceSt?.length > 0 ? (
            deviceSt.map((item) => (
              <DevicesOnModulesItem key={item?.id} device={item} />
            ))
          ) : (
            <Text>Device on module is empty</Text>
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default ModuleDevicesScreen;
