import {
	Pressable,
	SafeAreaView,
	ScrollView,
	Text,
	useWindowDimensions,
	View,
	Image,
	StyleSheet
} from "react-native";
import * as React from "react";
import { AppColors, AppStyles } from "../../../../global";
import {
	AntDesign,
	MaterialCommunityIcons,
	MaterialIcons,
	FontAwesome5,
	Feather,
	Ionicons,
} from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../../AppNavigator";
import { useNavigation } from "@react-navigation/native";
import { homeLeftIcon } from "../../../../assets";

type ScreenNavigationProps = NativeStackNavigationProp<
	RootStackParamList,
	"HomeScreen"
>;

function HomeTab() {
	const { width: screenWidth } = useWindowDimensions();
	const navigation = useNavigation<ScreenNavigationProps>();
	const menuOptions = [
		{
			title: "Quản lý nông trại",
			icon: (
				<MaterialCommunityIcons
					name="chart-tree"
					size={48}
					color={AppColors.primaryColor}
				/>
			),
			backgroundColor: "rgba(22,163,74,0.1)",
			onPress: () => {
				navigation.navigate("ListFarmScreen");
			},
		},
		{
			title: "Quản lý thiết bị",
			icon: (
				<MaterialIcons
					name="device-thermostat"
					size={48}
					color={AppColors.primaryColor}
				/>
			),
			backgroundColor: "rgba(22,163,74,0.1)",
			onPress: () => {
				navigation.navigate("ModulesScreen");
			},
		},
		{
			title: "Thông báo",
			icon: (
				<AntDesign
					name="notification"
					size={48}
					color={AppColors.primaryColor}
				/>
			),
			backgroundColor: "rgba(22,163,74,0.1)",
			onPress: () => {},
		},
		{
			title: "Nhiệm vụ",
			icon: (
				<FontAwesome5
					name="tasks"
					size={48}
					color={AppColors.primaryColor}
				/>
			),
			backgroundColor: "rgba(22,163,74,0.1)",
			onPress: () => {},
		},
		{
			title: "Thống kê",
			icon: (
				<MaterialCommunityIcons
					name="google-analytics"
					size={48}
					color={AppColors.primaryColor}
				/>
			),
			backgroundColor: "rgba(22,163,74,0.1)",
			onPress: () => {},
		},
		{
			title: "Cài đặt",
			icon: (
				<Feather
					name="settings"
					size={48}
					color={AppColors.primaryColor}
				/>
			),
			backgroundColor: "rgba(22,163,74,0.1)",
			onPress: () => {},
		},
	];
	return (
		<SafeAreaView style={[AppStyles.appContainer]}>
			<View
				style={{
					display: "flex",
					flexDirection: "row",
					alignItems: "center",
					paddingHorizontal: 20,
					backgroundColor: AppColors.primaryColor,
					paddingVertical: 10,
					justifyContent: "space-between",
				}}
			>
				<Image source={homeLeftIcon} style={{ width: 30 }} />
				<Text style={{ fontSize: 18, color: "white", fontWeight: "500" }}>
					Agricultural Management
				</Text>
				<Ionicons
					name="notifications-outline"
					size={24}
					color="white"
				/>
			</View>
			<ScrollView
				contentContainerStyle={{
					paddingLeft: 20,
					paddingTop: 40,
				}}
			>
				<View
					style={{
						flexDirection: "row",
						flexWrap: "wrap",
					}}
				>
					{menuOptions.map((option) => {
						return (
							<Pressable
								key={option.title}
								onPress={option.onPress}
							>
								<View
									style={{
										width: (screenWidth - 20 * 3) / 2,
										height: (screenWidth - 20 * 3) / 2,
										marginEnd: 20,
										marginBottom: 16,
									}}
								>
									<View
										style={{
											backgroundColor:
												option.backgroundColor,
											alignItems: "center",
											justifyContent: "center",
											borderWidth: 0.5,
											borderRadius: 15,
											borderColor: AppColors.slate200,
											position: "relative",
											flex: 1,
										}}
									>
										<View
											style={{
												position: "absolute",
												alignSelf: "center",
												alignItems: "center",
											}}
										>
											{option.icon}
											<Text
												style={{
													textAlign: "center",
													marginTop: 24,
													fontSize: 16,
													fontWeight: "500",
												}}
											>
												{option.title}
											</Text>
										</View>
									</View>
								</View>
							</Pressable>
						);
					})}
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

export default HomeTab;

// Thêm StyleSheet để quản lý kiểu CSS
const styles = StyleSheet.create({
    androidContainer: {
        marginTop: 10, // Margin top 10px cho Android
        flex: 1,
    },
});