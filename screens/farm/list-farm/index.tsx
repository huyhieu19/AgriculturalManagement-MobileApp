import React from "react";
import {
	Pressable,
	RefreshControl,
	SafeAreaView,
	ScrollView,
	Text,
	View,
} from "react-native";
import { AppColors, AppStyles } from "../../../global";
import { AntDesign } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../AppNavigator";
import { useNavigation } from "@react-navigation/native";
import { getListFarm } from "../../../network/apis";
import { ListFarmItem } from "../components/list-farm-item";
import { CreateFarmScreen } from "../components/add-new-farm"
import { Farm } from "../../../network/models";
import { ActivityIndicator } from "react-native-paper";
import { IFramDetails } from "../../../types/farm.type";
import { greenA200 } from "react-native-paper/lib/typescript/styles/themes/v2/colors";

type ScreenNavigationProp = NativeStackNavigationProp<
	RootStackParamList,
	"ListFarmScreen"
>;
const ListFarmScreen: React.FC = () => {
	const navigation = useNavigation<ScreenNavigationProp>();
	const [farms, setFarms] = React.useState<Farm[]>([]);
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const fetchListFarm = React.useCallback(async () => {
		try {
			setIsLoading(true);
			const res = await getListFarm();
			console.log(res);
			setFarms(res.data.Data);
		} catch (e) {
			console.log(e);
		} finally {
			setIsLoading(false);
		}
	}, []);

	const hangeNavigateScreen = (item: IFramDetails) => {
		navigation.navigate("FarmDetailsScreen", item);
	};

	const hangeNavigateScreenCreateFarm = () => {
		navigation.navigate("CreateFarmScreen");
	};

	React.useEffect(() => {
		fetchListFarm().then(() => {});
	}, [fetchListFarm]);

	return (
		<SafeAreaView style={[AppStyles.appContainer, {}]}>
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
					Danh sách nông trại
				</Text>
				<Pressable
					style={{
						position: "absolute",
						right: 20
					}}
					onPress={() => {
						hangeNavigateScreenCreateFarm();
						}
					}
				>

					<AntDesign name="pluscircleo" size={24} color="white" />
				</Pressable>
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
							onRefresh={fetchListFarm}
						/>
					}
					contentContainerStyle={{
						paddingHorizontal: 20,
						paddingTop: 30,
					}}
				>
					{farms != null &&
						farms?.length > 0 ?
						farms.map((item) => (
							<ListFarmItem
								key={item?.id}
								farm={item}
								onPress={() => hangeNavigateScreen(item)}
							/>
						) ): <Text>Bạn chưa tạo nông trại nào</Text>}
				</ScrollView>
			)}
		</SafeAreaView>
	);
};

export default ListFarmScreen;
