//import liraries
import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	SafeAreaView,
	Image,
	Pressable,
	ActivityIndicator,
	ScrollView,
	RefreshControl,
} from "react-native";
import {
	useRoute,
	RouteProp,
	useNavigation,
	ParamListBase,
} from "@react-navigation/native";
import { IFramDetails } from "../../../types/farm.type";
import { AppColors, AppStyles } from "../../../global";
import { AntDesign } from "@expo/vector-icons";
import { ListFarmItem } from "../components/list-farm-item";
import { getListZone } from "../../../network/apis";
import { IZoneParams } from "../../../types/zone.type";
import { ListZoneItem } from "./farmDetailsItem";

type ParamList = {
	FarmDetailsScreen: IFramDetails;
};

const FarmDetailsScreen = () => {
	const route = useRoute<RouteProp<ParamList, "FarmDetailsScreen">>();
	const navigation = useNavigation<any>();
	const farm = route?.params ?? [];
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [zoneList, setZoneList] = useState<IZoneParams[]>([]);

	const fetchListZone = React.useCallback(async () => {
		try {
			setIsLoading(true);
			const res = await getListZone({ farmId: Number(farm?.id!) });
			setZoneList(res.data.Data as IZoneParams[]);
		} catch (e) {
			console.log(e);
		} finally {
			setIsLoading(false);
		}
	}, []);

	React.useEffect(() => {
		fetchListZone().then(() => {});
	}, []);
	console.log(zoneList);

	function hangeNavigateScreenCreateZone(item: IFramDetails) {
		navigation.navigate("AddNewZoneScreen", item);
	}

	return (
		<SafeAreaView style={AppStyles.appContainer}>
			<View
				style={{
					display: "flex",
					flexDirection: "row",
					alignItems: "center",
					paddingHorizontal: 20,
					backgroundColor: AppColors.primaryColor,
					paddingVertical: 12,
					justifyContent: "center",
				}}
			>
				<Pressable
					style={{
						position: "absolute",
						left: 20,
					}}
					onPress={() => {
						navigation.goBack();
					}}
				>
					<AntDesign name="left" size={24} color="white" />
				</Pressable>
				<Text style={{ fontSize: 18, color: "white", fontWeight: "500"}}>
					Khu trong nông trại
				</Text>
				<Pressable
					style={{
						position: "absolute",
						right: 20
					}}
					onPress={() => {
						hangeNavigateScreenCreateZone(farm);
						}
					}
				>
					<AntDesign name="pluscircleo" size={24} color="white" />
				</Pressable>
			</View>
			<View>
				<ListFarmItem farm={farm} isBorderRadius isBgPrimary />
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
							onRefresh={fetchListZone}
						/>
					}
					contentContainerStyle={{
						paddingHorizontal: 10,
						paddingTop: 5,
					}}
				>
					{zoneList &&
						zoneList?.length > 0 &&
						zoneList.map((item) => {
							console.log("item", item);
							return (
								<ListZoneItem
									key={item?.id}
									zone={item}
									// onPress={() => hangeNavigateScreen(item)}
								/>
							);
						})}
				</ScrollView>
			)}
		</SafeAreaView>
	);
};

// define your styles
const styles = StyleSheet.create({});

//make this component available to the app
export default FarmDetailsScreen;
