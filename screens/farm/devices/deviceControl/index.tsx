import { View, Text, SafeAreaView, Pressable } from 'react-native'
import React from 'react'
import { AppColors, AppStyles } from '../../../../global'
import { AntDesign } from "@expo/vector-icons";
import {
    useRoute,
    RouteProp,
    useNavigation,
    useIsFocused
} from "@react-navigation/native";
import { IZoneParams } from '../../../../types/zone.type';
import { ListZoneItem } from '../../farmDetails/farmDetailsItem';

type ParamList = {
    ZoneList: IZoneParams;
};

const DeviceControlScreen = () => {

    const route = useRoute<RouteProp<ParamList, "ZoneList">>();
    const zone = route?.params ?? [];
    const isFocused = useIsFocused();

    const navigation = useNavigation<any>();
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
                        navigation.navigate("FarmDetailsScreen");
                    }}
                >
                    <AntDesign name="left" size={24} color="white" />
                </Pressable>
                <Text style={{ fontSize: 18, color: "white", fontWeight: "500" }}>
                    Thiết bị điều khiển
                </Text>
            </View>
            <View>
                <ListZoneItem zone={zone} isBorderRadius isBgPrimary />
            </View>
        </SafeAreaView>
    )
}

export default DeviceControlScreen