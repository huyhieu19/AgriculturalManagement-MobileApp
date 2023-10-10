//import liraries
import React from "react";
import { StatusBar } from "expo-status-bar";
import { View, Text, SafeAreaView, Platform } from "react-native";

const HomeTab = () => {
  return (
    <SafeAreaView>
      <View className={`${Platform.OS === "android" ? "bg-light flex" : ""}`}>
        <StatusBar style="dar" />
        <View className={`${Platform.OS === "android" ? "mt-8" : ""}  h-full`}>
          <Text className="text-red-600">Home Tab</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeTab;
