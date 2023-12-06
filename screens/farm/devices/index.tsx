import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { AppColors } from "../../../global";
import DeviceControlScreen from "./deviceControl";
import AllDevicesOnZoneScreen from "./deviceOnZone";
import { IZoneParams } from "../../../types/zone.type";
import { RouteProp, useRoute } from "@react-navigation/native";
import screandasd from "../../../Mqtt/test";
type ParamList = {
    zone: IZoneParams;
};

const Tab = createBottomTabNavigator();

export default function DeviceOnZoneScreen() {
    const route = useRoute<RouteProp<ParamList, "zone">>();
    const routeParams = route?.params ?? [];

    console.log("Dã chuyển data sang màn DeviceOnZoneScreen, Id = " + routeParams.id);

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    height: 90,
                },
                headerShown: false,
                tabBarActiveTintColor: AppColors.primaryColor,
                tabBarInactiveTintColor: AppColors.inactiveColor,
                tabBarLabelStyle: {
                    fontSize: 13,
                },
            }}
        >
            <Tab.Screen
                options={{
                    tabBarIcon: ({ focused }) => (
                        <MaterialIcons name="device-thermostat" size={27} color={getFocusColor(focused)} />
                    ),
                }}
                name="Thiết bị đo"
                component={screandasd}
            />
            <Tab.Screen
                options={{
                    tabBarIcon: ({ focused }) => (
                        <MaterialIcons name="device-hub" size={27} color={getFocusColor(focused)} />
                    ),
                }}
                name="Thiết bị điều khiển"
                component={DeviceControlScreen}
                initialParams={routeParams}
            />
            <Tab.Screen
                options={{
                    tabBarIcon: ({ focused }) => (
                        <MaterialCommunityIcons name="view-module" size={24} color={getFocusColor(focused)} />
                    ),
                }}
                name="Tất cả thiết bị"
                component={AllDevicesOnZoneScreen}
                initialParams={routeParams}
            />

        </Tab.Navigator>
    );
}

const getFocusColor = (focus: boolean) => {
    return focus ? AppColors.primaryColor : AppColors.inactiveColor;
};
