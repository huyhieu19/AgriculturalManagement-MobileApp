//import liraries
import React from "react";
import { Image, Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeTab from "./tabs/HomeTab";
import SearchTab from "./tabs/SearchTab";
import ProfileTab from "./tabs/ProfileTab";
import { IC_HOME, IC_PROFILE, IC_SEARCH } from "../../assets/icons";

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
					tabBarLabel: "Tìm kiếm",
					tabBarIcon: ({ focused }) => {
						return getIcon(focused, IC_SEARCH);
					},
					// tabBarHideOnKeyboard: !(Platform.OS === "ios"),
				}}
				name="SearchTab"
				component={SearchTab}
			/>
			<Tab.Screen
				options={{
					tabBarLabel: "Profile",
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
					marginTop: 10,
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
