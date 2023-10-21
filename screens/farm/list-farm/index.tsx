import React from "react";
import {Image, Pressable, SafeAreaView, ScrollView, Text, View} from "react-native";
import {AppColors, AppStyles} from "../../../global";
import {AntDesign} from "@expo/vector-icons";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {RootStackParamList} from "../../../AppNavigator";
import {useNavigation} from "@react-navigation/native";
import {getListFarm} from "../../../network/apis";
import {ListFarmItem} from "../components/list-farm-item";


type ScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ListFarmScreen'>
const ListFarmScreen: React.FC = () => {
    const navigation = useNavigation<ScreenNavigationProp>()
    const fetchListFarm = React.useCallback(async () => {
        try {
            const res = await getListFarm()
            console.log(res.data)
        } catch (e) {
            console.log(e)
        } finally {

        }
    }, [])
    React.useEffect(() => {
        fetchListFarm().then(() => {
        });
    }, [fetchListFarm])

    return (
        <SafeAreaView style={[AppStyles.appContainer, {}]}>
            <View style={{
                justifyContent: "center",
                alignItems: 'center',
                width: "100%",
                paddingVertical: 18,
                borderBottomWidth: 0.5,
                borderBottomColor: AppColors.slate300,
                position: 'relative',
            }}>
                <Pressable style={{
                    position: 'absolute',
                    left: 20,
                    top: 18,
                }} onPress={() => {
                    navigation.goBack();
                }}>
                    <AntDesign name="left" size={27} color="black"/>
                </Pressable>
                <Text style={{
                    color: "black",
                    fontSize: 20,
                    fontWeight: "500",
                }}>Danh sách nông trại</Text>
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal: 20,
                    paddingTop: 30,
                }}>
                {Array(10).fill(0).map((item, index) => (<ListFarmItem key={index}/>))}
            </ScrollView>
        </SafeAreaView>
    );
}

export default ListFarmScreen;


