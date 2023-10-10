//import liraries
import React from "react";
import { Image, Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeTab from "./tabs/HomeTab";
import WeatherTab from "./tabs/WeatherTab";
import ProfileTab from "./tabs/ProfileTab";
import { IC_HOME, IC_PROFILE, IC_SUN } from "../../assets/icons";

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        lazy: false,
        initialRouteName: "HomeTab",
        tabBarActiveTintColor: "#38bdf8",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: [
          {
            backgroundColor: "white",
            borderTopWidth: 0, // remove top border
            height: 80,
            borderTopColor: "gray",
          },
        ],
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 4,
        },
      }}
    >
      <Tab.Screen
        options={{
          tabBarLabel: "Trang chủ",
          tabBarIcon: ({ focused }) => {
            return getIcon(focused, IC_HOME);
          },
        }}
        name="HomeTab"
        component={HomeTab}
      />
      <Tab.Screen
        options={{
          tabBarLabel: "Thời Tiết",
          tabBarIcon: ({ focused }) => {
            return getIcon(focused, IC_SUN);
          },
          // tabBarHideOnKeyboard: !(Platform.OS === "ios"),
        }}
        name="WeatherTab"
        component={WeatherTab}
      />
      <Tab.Screen
        options={{
          tabBarLabel: "Cá Nhân",
          tabBarIcon: ({ focused }) => {
            return getIcon(focused, IC_PROFILE);
          },
        }}
        name="ProfileTab"
        component={ProfileTab}
      />
    </Tab.Navigator>
  );
};

function getIcon(focus, source) {
  return (
    <Image
      style={[
        {
          width: 28,
          height: 28,
        },
        {
          tintColor: focus ? "#38bdf8" : "gray",
        },
      ]}
      source={source}
    />
  );
}
export default HomeScreen;
