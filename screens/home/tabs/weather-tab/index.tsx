import React from "react";
import {Text, SafeAreaView} from "react-native";
import { AppStyles } from "../../../../global";


const WeatherTab: React.FC = () => {
    return <SafeAreaView style={[
				AppStyles.appContainer
			]}>
        <Text>Weather Tab</Text>
    </SafeAreaView>
}

export default WeatherTab
