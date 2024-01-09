import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather, AntDesign } from "@expo/vector-icons";
import { AppColors } from "../../../global";
import SettingsTimerScreen from "./display";
import SettingsTimerHisScreen from "./display/index2";
const Tab = createBottomTabNavigator();

export default function TimerScreen() {
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
            <Feather name="home" size={27} color={getFocusColor(focused)} />
          ),
        }}
        name="Chờ thực hiện"
        component={SettingsTimerScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="profile"
              size={27}
              color={getFocusColor(focused)}
            />
          ),
        }}
        name="Lịch sử"
        component={SettingsTimerHisScreen}
      />
    </Tab.Navigator>
  );
}

const getFocusColor = (focus: boolean) => {
  return focus ? AppColors.primaryColor : AppColors.inactiveColor;
};
