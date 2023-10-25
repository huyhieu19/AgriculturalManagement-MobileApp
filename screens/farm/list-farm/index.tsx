import React from 'react';
import {
	Pressable,
	RefreshControl,
	SafeAreaView,
	ScrollView,
	Text,
	View,
} from 'react-native';
import { AppColors, AppStyles } from '../../../global';
import { AntDesign } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../AppNavigator';
import { useNavigation } from '@react-navigation/native';
import { getListFarm } from '../../../network/apis';
import { ListFarmItem } from '../components/list-farm-item';
import { Farm } from '../../../network/models';
import { ActivityIndicator } from 'react-native-paper';

type ScreenNavigationProp = NativeStackNavigationProp<
	RootStackParamList,
	'ListFarmScreen'
>;
const ListFarmScreen: React.FC = () => {
	const navigation = useNavigation<ScreenNavigationProp>();
	const [farms, setFarms] = React.useState<Farm[]>([]);
	const [isLoading, setLoading] = React.useState<boolean>(false);
	const fetchListFarm = React.useCallback(async () => {
		try {
			setLoading(true);
			const res = await getListFarm();
			setFarms(res.data.Data);
		} catch (e) {
			console.log(e);
		} finally {
			setLoading(false);
		}
	}, []);
	React.useEffect(() => {
		fetchListFarm().then(() => {});
	}, [fetchListFarm]);

	return (
		<SafeAreaView style={[AppStyles.appContainer, {}]}>
			<View
				style={{
					justifyContent: 'center',
					alignItems: 'center',
					width: '100%',
					paddingVertical: 18,
					borderBottomWidth: 0.5,
					borderBottomColor: AppColors.slate300,
					position: 'relative',
				}}
			>
				<Pressable
					style={{
						position: 'absolute',
						left: 20,
						top: 18,
					}}
					onPress={() => {
						navigation.goBack();
					}}
				>
					<AntDesign name="left" size={27} color="black" />
				</Pressable>
				<Text
					style={{
						color: 'black',
						fontSize: 20,
						fontWeight: '500',
					}}
				>
					Danh sách nông trại
				</Text>
			</View>

			{isLoading ? (
				<View
					style={{
						flex: 1,
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<ActivityIndicator size={'large'} color={AppColors.primaryColor} />
				</View>
			) : (
				<>
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
						{farms &&
							farms?.length > 0 &&
							farms.map((item) => <ListFarmItem key={item?.id} farm={item} />)}
					</ScrollView>
				</>
			)}
		</SafeAreaView>
	);
};

export default ListFarmScreen;
