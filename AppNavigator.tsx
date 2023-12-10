import React from "react";
import {
  createNavigationContainerRef,
  NavigationContainer,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "./hooks/useAuth";
import { addOnUnAuthorizeListener, setAccessToken } from "./network";
import LoginScreen from "./screens/auth/login";
import HomeScreen from "./screens/home";
import ListFarmScreen from "./screens/farm/list-farm";
import FarmDetailsScreen from "./screens/farm/farmDetails";
import { IFramDetails } from "./types/farm.type";
import { CreateFarmScreen } from "./screens/farm/components/add-new-farm";
import { AddNewZoneScreen } from "./screens/farm/farmDetails/add-new-zone";
import ModulesScreen from "./screens/module/modules_main";
import ModuleAddScreen from "./screens/module/module_add";
import ModuleDevicesScreen from "./screens/module/modules_main/module_devices_item";
import { IModule } from "./types/module.type";
import DeviceControlScreen from "./screens/farm/devices/deviceControl";
import DeviceOnZoneScreen from "./screens/farm/devices";
import DeviceInstrumentationScreen from "./screens/farm/devices/deviceInstrumentation";
import { EditDeviceScreen } from "./screens/module/modules_main/edit_device_item";
import { IZoneParams } from "./types/zone.type";
import DeviceAddScreen from "./screens/farm/devices/addDeviceToZone";
import SettingsScreen from "./screens/setting";
import StatisticsScreen from "./screens/statistics";
import SettingsTimerScreen from "./screens/setting/timer/display";
import { EditFarmScreen } from "./screens/farm/components/edit_farm";
import { EditZoneScreen } from "./screens/farm/farmDetails/edit_zone";
import { EditModuleScreen } from "./screens/module/module_edit";
import { AddNewTimerScreen } from "./screens/setting/timer/add";

export type RootStackParamList = {
  // home
  HomeScreen: undefined;
  LoginScreen: undefined;
  RegisterScreen: undefined;
  // farm
  ListFarmScreen: undefined;
  CreateFarmScreen: undefined;
  EditFarmScreen: IFramDetails;
  // Zone
  FarmDetailsScreen: IFramDetails;
  AddNewZoneScreen: undefined;
  DeviceControlScreen: undefined;
  DeviceInstrumentationScreen: undefined;
  DeviceOnZoneScreen: undefined;
  DeviceAddScreen: IZoneParams;
  EditDeviceScreen: any;
  EditZoneScreen: IZoneParams;

  // module
  ModulesScreen: undefined;
  ModuleAddScreen: undefined;
  EditModuleScreen: any;
  ModuleDevicesScreen: IModule;

  // cài đặt
  SettingsScreen: undefined;
  SettingsTimerScreen: undefined;
  AddNewTimerScreen: undefined;
  // Thống kê
  StatisticsScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
export const navigationRef = createNavigationContainerRef<RootStackParamList>();

const AppNavigator: React.FC = () => {
  const { authData, signOut } = useAuth();
  const user = authData.user;

  React.useEffect(() => {
    addOnUnAuthorizeListener(() => {
      signOut();
    });
  }, []);

  React.useEffect(() => {
    setAccessToken(authData.token);
  }, [authData]);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {user ? (
          <>
            <Stack.Screen name={"HomeScreen"} component={HomeScreen} />
            {/* Farm */}

            <Stack.Screen name={"ListFarmScreen"} component={ListFarmScreen} />
            <Stack.Screen
              name={"FarmDetailsScreen"}
              component={FarmDetailsScreen}
            />
            <Stack.Screen name={"EditZoneScreen"} component={EditZoneScreen} />
            <Stack.Screen
              name={"CreateFarmScreen"}
              component={CreateFarmScreen}
            />

            <Stack.Screen
              name={"AddNewZoneScreen"}
              component={AddNewZoneScreen}
            />

            <Stack.Screen name={"EditFarmScreen"} component={EditFarmScreen} />

            {/* device on Zone */}
            <Stack.Screen
              name={"DeviceOnZoneScreen"}
              component={DeviceOnZoneScreen}
            />
            <Stack.Screen
              name={"DeviceControlScreen"}
              component={DeviceControlScreen}
            />
            <Stack.Screen
              name={"DeviceInstrumentationScreen"}
              component={DeviceInstrumentationScreen}
            />
            <Stack.Screen
              name={"EditDeviceScreen"}
              component={EditDeviceScreen}
            />
            <Stack.Screen
              name={"DeviceAddScreen"}
              component={DeviceAddScreen}
            />

            {/* ---------------- */}

            {/* Module */}

            <Stack.Screen name={"ModulesScreen"} component={ModulesScreen} />
            <Stack.Screen
              name={"ModuleAddScreen"}
              component={ModuleAddScreen}
            />
            <Stack.Screen
              name={"EditModuleScreen"}
              component={EditModuleScreen}
            />
            <Stack.Screen
              name={"ModuleDevicesScreen"}
              component={ModuleDevicesScreen}
            />
            {/* ---------------- */}

            {/* Setting */}
            <Stack.Screen name={"SettingsScreen"} component={SettingsScreen} />
            <Stack.Screen
              name={"SettingsTimerScreen"}
              component={SettingsTimerScreen}
            />
            <Stack.Screen
              name={"AddNewTimerScreen"}
              component={AddNewTimerScreen}
            />

            {/* ---------------- */}

            {/* Statistic */}
            <Stack.Screen
              name={"StatisticsScreen"}
              component={StatisticsScreen}
            />
            {/* ---------------- */}
          </>
        ) : (
          <>
            <Stack.Screen name={"LoginScreen"} component={LoginScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
