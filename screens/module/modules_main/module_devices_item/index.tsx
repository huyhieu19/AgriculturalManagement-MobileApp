import { View, Text, SafeAreaView, Pressable, ActivityIndicator, ScrollView, RefreshControl } from 'react-native'
import React from 'react'
import { useNavigation, RouteProp, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../../AppNavigator';
import { AppColors } from '../../../../global';
import { AntDesign } from "@expo/vector-icons";
import DevicesOnModulesItem from './device_item';
import { IModule } from '../../../../types/module.type';


type ScreenNavigationProp = NativeStackNavigationProp<
	RootStackParamList,
	"ModulesScreen"
>;

type ModulesItemProps = {
	modules: IModule;
}

const ModuleDevicesScreen = () => {
	const navigation = useNavigation<ScreenNavigationProp>();
	const [isLoading, setIsLoading] = React.useState<boolean>(false);

	const route = useRoute<RouteProp<ModulesItemProps, 'modules'>>()

	return (
		<SafeAreaView style={{
			flex: 1,
			marginTop: 25
		}}>
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
						left: 20
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
						fontWeight: "500"
					}}
				>
					Danh sách thiết bị trên module
				</Text>

			</View>
			{isLoading ? (
				<View
					style={{
						flex: 1,
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<ActivityIndicator
						size={"large"}
						color={AppColors.primaryColor}
					/>
				</View>
			) : (
				<ScrollView
					showsVerticalScrollIndicator={false}
					refreshControl={
						<RefreshControl
							refreshing={isLoading}
						//onRefresh={fetchListDevicesOnModule}
						/>
					}
					contentContainerStyle={{
						paddingHorizontal: 20,
						paddingTop: 30,
					}}
				>
					{route.params.devices != null &&
						route.params.devices?.length > 0 ?
						route.params.devices.map((item) => (
							<DevicesOnModulesItem
								key={item?.id}
								device={item}
							/>
						)) : <Text>Device on module is empty</Text>}
				</ScrollView>
			)}
		</SafeAreaView>
	)
}

export default ModuleDevicesScreen