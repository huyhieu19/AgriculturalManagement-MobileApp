import React from 'react';
import {
	createNavigationContainerRef,
	NavigationContainer,
	NavigationContainerRef,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from './hooks/useAuth';
import { addOnUnAuthorizeListener, setAccessToken } from './network';
import LoginScreen from './screens/auth/login';
import HomeScreen from './screens/home';
import ListFarmScreen from './screens/farm/list-farm';

export type RootStackParamList = {
	HomeScreen: undefined;
	LoginScreen: undefined;
	RegisterScreen: undefined;
	ListFarmScreen: undefined;
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
						<Stack.Screen name={'HomeScreen'} component={HomeScreen} />
						<Stack.Screen name={'ListFarmScreen'} component={ListFarmScreen} />
					</>
				) : (
					<>
						<Stack.Screen name={'LoginScreen'} component={LoginScreen} />
					</>
				)}
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default AppNavigator;
