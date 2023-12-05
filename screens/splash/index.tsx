import React from "react";
import {Text, View} from "react-native";

const SplashScreen: React.FC = () => {
    return <View style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    }}>
        <Text>Quản lý nông trại thông minh</Text>
    </View>
}

export default SplashScreen;
