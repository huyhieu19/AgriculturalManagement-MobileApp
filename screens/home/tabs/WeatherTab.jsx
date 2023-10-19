//import liraries
import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  Switch,
  StyleSheet,
} from "react-native";
import { StatusBar } from "expo-status-bar";

const WeatherTab = () => {
  return (
    <SafeAreaView>
      <View className={`${Platform.OS === "android" ? "bg-light flex" : ""}`}>
        <View className={`${Platform.OS === "android" ? "mt-8" : ""}  h-full`}>
          {/* <View style={styles.container}>
            <View style={styles.header}>
              <Image
                source={require("./assets/profile.jpg")}
                style={styles.profile}
              />
              <Text style={styles.title}>Cá nhân</Text>
              <Switch style={styles.switch} />
            </View>
            <View style={styles.grid}>
              <View style={styles.row}>
                <Image
                  source={require("./assets/farm.png")}
                  style={styles.icon}
                />
                <Image
                  source={require("./assets/equipment.png")}
                  style={styles.icon}
                />
                <Image
                  source={require("./assets/notification.png")}
                  style={styles.icon}
                />
              </View>
              <View style={styles.row}>
                <Image
                  source={require("./assets/task.png")}
                  style={styles.icon}
                />
                <Image
                  source={require("./assets/calendar.png")}
                  style={styles.icon}
                />
                <Image
                  source={require("./assets/setting.png")}
                  style={styles.icon}
                />
              </View>
              <View style={styles.row}>
                <Image
                  source={require("./assets/home.png")}
                  style={styles.icon}
                />
                <Image
                  source={require("./assets/weather.png")}
                  style={styles.icon}
                />
                <Image
                  source={require("./assets/personal.png")}
                  style={styles.icon}
                />
              </View>
            </View> */}
          {/* </View> */}
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4caf50",
    padding: 10,
  },
  profile: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  title: {
    flex: 1,
    fontSize: 20,
    color: "#fff",
    textAlign: "center",
  },
  switch: {
    transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
  },
  grid: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    marginVertical: 10,
  },
  icon: {
    width: 100,
    height: 100,
    marginHorizontal: 10,
  },
});
export default WeatherTab;
