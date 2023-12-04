import { View, Text, SafeAreaView, Pressable, ActivityIndicator, ScrollView, RefreshControl } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../../AppNavigator';
import { AppColors } from '../../../../global';
import { AntDesign } from "@expo/vector-icons";
import { IDeviceOnModule } from '../../../../types/device.type';
import { getListDevicesOnModule } from '../../../../network/apis';

type ScreenNavigationProp = NativeStackNavigationProp<
	RootStackParamList,
	"ModulesScreen"
>;

const ModuleDevicesScreen = () => {
    const navigation = useNavigation<ScreenNavigationProp>();
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [devices, setDevices] = React.useState<IDeviceOnModule[]>([]);
        const [id, setId] = React.useState<String>("97429d21-59e0-43ab-20e9-08dbeb8ab6a6");
    
    const fetchListDevicesOnModule = React.useCallback(async () => {
    try {
            setIsLoading(true);
            const res = await getListDevicesOnModule({id : String});
            console.log(res);
            console.log("abc")
            setDevices(res.data.Data as unknown as IDeviceOnModule[]);
        } catch (e) {
            console.log(e);
        } finally {
            setIsLoading(false);
        }
    }, []);

    React.useEffect(() => {
        fetchListDevicesOnModule().then(() => {});
    }, []);
  return (
    <SafeAreaView>
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
				{/* <Pressable
					style={{
						position: "absolute",
						right: 20
					}}
					onPress={() => {
						  hangeNavigateScreenAddModule();
						}
					}
				>
					<AntDesign name="pluscircleo" size={24} color="white" />
				</Pressable> */}
      </View>
      { isLoading ? (
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
							onRefresh={fetchListDevicesOnModule}
						/>
					}
					contentContainerStyle={{
						paddingHorizontal: 20,
						paddingTop: 30,
					}}
				>
					{/* {module != null &&
						module?.length > 0 ?
						module.map((item) => (
							<ModulesItem
								key={item?.id}
								modules={item}
								onPress={() => hangeNavigateToModuleDetailScreen(item)}
							/>
              
						) ): <Text>Bạn chưa có sử dụng module nào</Text>} */}
				</ScrollView>
      )}
    </SafeAreaView>
  )
}

export default ModuleDevicesScreen