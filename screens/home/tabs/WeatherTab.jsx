//import liraries
import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import * as Progress from "react-native-progress";

const WeatherTab = () => {
  return (
    <SafeAreaView>
      <StatusBar className="black" />
      <View className="flex-1 relative"></View>
      <View className="flex-1 flex-row justify-center items-center">
        <Progress.CircleSnail
          thickness={10}
          size={140}
          color="#0bb3b2"
          className="bg-white"
        />
      </View>
    </SafeAreaView>
  );
};

export default WeatherTab;
