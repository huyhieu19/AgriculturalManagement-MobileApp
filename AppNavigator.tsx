import React from "react";
import {
	createNavigationContainerRef,
	NavigationContainer,
	NavigationContainerRef,
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

export type RootStackParamList = {
	HomeScreen: undefined;
	LoginScreen: undefined;
	RegisterScreen: undefined;
	ListFarmScreen: undefined;
	FarmDetailsScreen: IFramDetails;
	CreateFarmScreen: undefined;
	AddNewZoneScreen: undefined;
	ModulesScreen: undefined;
	ModuleAddScreen: undefined;
	ModuleDevicesScreen: undefined;
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
						<Stack.Screen
							name={"HomeScreen"}
							component={HomeScreen}
						/>
						<Stack.Screen
							name={"ListFarmScreen"}
							component={ListFarmScreen}
						/>
						<Stack.Screen
							name={"FarmDetailsScreen"}
							component={FarmDetailsScreen}
						/>
						<Stack.Screen
							name={"CreateFarmScreen"}
							component={CreateFarmScreen}
						/>

						<Stack.Screen
							name={"AddNewZoneScreen"}
							component={AddNewZoneScreen}
						/>
						<Stack.Screen
							name={"ModulesScreen"}
							component={ModulesScreen}
						/>
						<Stack.Screen
							name={"ModuleAddScreen"}
							component={ModuleAddScreen}
						/>
						<Stack.Screen
							name={"ModuleDevicesScreen"}
							component={ModuleDevicesScreen}
						/>
					</>
				) : (
					<>
						<Stack.Screen
							name={"LoginScreen"}
							component={LoginScreen}
						/>
					</>
				)}
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default AppNavigator;
